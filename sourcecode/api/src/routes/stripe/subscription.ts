import { Stripe } from 'stripe';
import { Context } from '../../context';
import logger from '../../services/logger';
import {
    getCustomerIdFromSubscription,
    stripeSubscriptionToDbSubscription,
} from '../../services/stripe';

export const handleSubscriptionEvent = async (
    context: Context,
    subscription: Stripe.Subscription
) => {
    let dbSubscription = await context
        .db()
        .subscription.getByStripeSubscriptionId.load(subscription.id);

    if (!dbSubscription) {
        const user = await context
            .db()
            .user.getByStripeCustomerId.load(
                getCustomerIdFromSubscription(subscription)
            );

        if (!user) {
            logger.error(
                `Unknown stripe customer ID ${getCustomerIdFromSubscription(
                    subscription
                )}`
            );

            return false;
        }

        await context.db().subscription.create({
            ...stripeSubscriptionToDbSubscription(subscription),
            userId: user.id,
        });
    } else {
        await context
            .db()
            .subscription.updateById(
                dbSubscription.id,
                stripeSubscriptionToDbSubscription(subscription)
            );
    }

    return {
        success: true,
    };
};
