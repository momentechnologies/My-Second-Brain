import gql from 'graphql-tag';
import { Context } from '../../context';
import stripe from '../../services/stripe';
import appConfig from '../../config/app';

export const schema = gql`
    type Mutation {
        createSession(subscriptionName: String!): CreateSessionResponse
    }

    type CreateSessionResponse {
        redirectUrl: String!
    }
`;

export const resolvers = {
    Mutation: {
        createSession: async (_, { priceId }, context: Context) => {
            const session = await stripe.checkout.sessions.create({
                mode: 'subscription',
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                success_url: `${appConfig.url}/app/payment/success-callback?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${appConfig.url}/app/payment/canceled`,
            });

            return {
                redirectUrl: session.url,
            };
        },
    },
};
