import { transformLinks } from '../index.ts';
import { buildRawContext } from '../../../graphql/context/index.js';

describe('Email service', () => {
    describe('transformLinks', () => {
        it(`should return correct data`, async () => {
            const context = buildRawContext();

            context.db.link.create = jest.fn().mockResolvedValue({
                id: 1,
            });

            const data = {
                test: 'asdf',
                __link__link: 'http://dronehandelen.no',
                list: [{ __link__aa: 'http://sss.no' }],
            };
            const response = await transformLinks(context, data);

            expect(context.db.link.create).toBeCalledTimes(2);
            expect(response.data.test).toBe(data.test);
            expect(response.data.list[0].aa).toBeDefined();
            expect(response.links.length).toBe(2);
        });
    });
});
