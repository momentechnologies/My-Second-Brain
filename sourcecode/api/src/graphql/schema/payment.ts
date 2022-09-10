import gql from 'graphql-tag';
import * as DateFns from 'date-fns';
import { Context } from '../../context';
import stripe from '../../services/stripe';
import stripeConfig from '../../config/stripe';
import appConfig from '../../config/app';
import ClientException from '../../exceptions/client';
import { isUniqueError } from '../../services/db';

export const schema = gql`
    type Mutation {
        startPaymentPage: StartPaymentResponse
        confirmSubscription(sessionId: String!): Boolean
        createBillingPageLink(returnUrl: String!): StartPaymentResponse
    }

    type StartPaymentResponse {
        url: String!
    }
`;

export const resolvers = {
    Mutation: {
        confirmSubscription: async (_, { sessionId }, context: Context) => {
            let user = await context.db().user.getById.load(context.user.id);

            const session = await stripe.checkout.sessions.retrieve(sessionId, {
                expand: ['subscription'],
            });

            if (
                !session ||
                session.customer !== user.stripeCustomerId ||
                typeof session.subscription === 'string'
            ) {
                throw new ClientException(
                    'Invalid session ID provided',
                    'sessionId'
                );
            }

            try {
                await context.db().subscription.create({
                    stripeSubscriptionId: session.subscription.id,
                    trialEndsAt: DateFns.fromUnixTime(
                        session.subscription.trial_end
                    ),
                    userId: user.id,
                    startsAt: DateFns.fromUnixTime(
                        session.subscription.start_date
                    ),
                    nextRenewalAt: DateFns.fromUnixTime(
                        session.subscription.trial_end
                    ),
                    status: session.subscription.status,
                });
            } catch (e) {
                if (!isUniqueError(e)) {
                    throw e;
                }

                console.error(e);
            }

            return true;
        },
        startPaymentPage: async (_, args, context: Context) => {
            let user = await context.db().user.getById.load(context.user.id);
            if (!user.stripeCustomerId) {
                const customer = await stripe.customers.create({
                    email: user.email,
                });

                user = await context.db().user.updateById(user.id, {
                    stripeCustomerId: customer.id,
                });
            }

            const session = await stripe.checkout.sessions.create({
                customer: user.stripeCustomerId,
                billing_address_collection: 'auto',
                line_items: [
                    {
                        price: stripeConfig.subscriptionPriceIds.standard,
                        // For metered billing, do not pass quantity
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: `${appConfig.url}/auth/create-subscription?success=true&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${appConfig.url}/auth/create-subscription?canceled=true`,
                subscription_data: {
                    trial_period_days: 14,
                },
                automatic_tax: { enabled: true },
                customer_update: {
                    address: 'auto',
                    name: 'auto',
                    shipping: 'auto',
                },
            });

            return {
                url: session.url,
            };
        },
        createBillingPageLink: async (_, { returnUrl }, context: Context) => {
            let user = await context.db().user.getById.load(context.user.id);

            const portalSession = await stripe.billingPortal.sessions.create({
                customer: user.stripeCustomerId,
                return_url: returnUrl,
            });

            return {
                url: portalSession.url,
            };
        },
    },
};
