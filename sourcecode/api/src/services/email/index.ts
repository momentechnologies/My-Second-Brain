import fs from 'fs-extra';
import path from 'path';
import appConfig from '../../config/app';
import sendgrid from './sendgrid';
import * as TokenUtils from '../token';
import Handlebars from 'handlebars';
import __dirname from './dirname.cjs';
import { addLinkTrackingToUrl } from '../linkService';
import { Context } from '../../context';
import emailConfig from '../../config/email';

const partials = fs.readdirSync(path.join(__dirname, 'templates/partials'));

for (let partial of partials) {
    Handlebars.registerPartial(
        partial.slice(0, -'.hbs'.length),
        fs.readFileSync(`${__dirname}/templates/partials/${partial}`).toString()
    );
}

Handlebars.registerHelper('pluralize', (number, single, plural) => {
    if (number === 1) {
        return single;
    }

    return plural;
});

const keyPrefix = '__link__';

export const transformLinks = async (context, data) => {
    if (Array.isArray(data)) {
        const transformed = await Promise.all(
            data.map((d) => transformLinks(context, d))
        );

        return {
            data: transformed.map((t) => t.data),
            links: transformed.map((t) => t.links).flat(),
        };
    }

    if (typeof data === 'object' && data !== null) {
        return Object.entries(data).reduce(
            async (promise, [key, value]: [key: string, value: string]) => {
                const { data, links } = await promise;
                let actualKey = key;
                let actualValue = value;

                if (key.startsWith(keyPrefix)) {
                    actualKey = key.substring(keyPrefix.length);
                    const link = await context.db.link.create({
                        url: value,
                    });

                    actualValue = await addLinkTrackingToUrl(
                        context,
                        value,
                        link.id
                    );
                    links.push(link);
                } else {
                    const transformed = await transformLinks(
                        context,
                        actualValue
                    );
                    actualValue = transformed.data;
                    links.push(...transformed.links);
                }

                return {
                    data: {
                        ...data,
                        [actualKey]: actualValue,
                    },
                    links,
                };
            },
            Promise.resolve({ data: {}, links: [] })
        );
    }

    return {
        data,
        links: [],
    };
};

const send = async (
    context: Context,
    subject,
    text,
    template,
    preparsedData,
    to
) => {
    const { data } = await transformLinks(context, preparsedData);
    const html = await getHtml(template, {
        ...data,
        url: appConfig.url,
    });

    let tos = [to];

    if (Array.isArray(to)) {
        tos = to;
    }

    if (appConfig.isProd) {
        return sendgrid.send(
            tos.map((to) => ({
                to,
                from: {
                    email: emailConfig.fromInfo.email,
                    name: emailConfig.fromInfo.name,
                },
                subject,
                text,
                html,
            }))
        );
    }

    const fileName = `[${Date.now()}]${subject.replace(
        /[/\\?%*:|"<> ]/g,
        '-'
    )}.html`;

    await fs.ensureDir(process.cwd() + '/emails');
    await fs.writeFile(process.cwd() + '/emails/' + fileName, html);
};

const getHtml = async (template, data) => {
    const content = await fs.readFile(`${__dirname}/templates/${template}.hbs`);

    return Handlebars.compile(content.toString())(data);
};

const sendConfirmationEmail = async (context: Context, email, token) => {
    return await send(
        context,
        `Confirm your email`,
        `Welcome to My Second brain! Please confirm your email to use your account.`,
        'confirmEmail',
        {
            token,
        },
        email
    );
};

export const sendResetPasswordEmail = async (context, email, token) => {
    return await send(
        context,
        `Reset password`,
        `Reset password`,
        'resetPassword',
        {
            __link__resetUrl: `${appConfig.url}/reset-password?token=${token}`,
        },
        email
    );
};

export const newConfirmationEmail = async (context: Context, user) => {
    const token = TokenUtils.encrypt(
        {
            type: 'confirm-email',
            user,
        },
        24 * 7
    );

    await sendConfirmationEmail(context, user.email, token);
};
