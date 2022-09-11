import Stripe from 'stripe';
import stripeConfig from '../config/stripe';
import * as DateFns from 'date-fns';

export default new Stripe(stripeConfig.privateKey, {
    apiVersion: '2022-08-01',
});

export const getCustomerIdFromSubscription = (
    subscription: Stripe.Subscription
): string => {
    if (typeof subscription.customer === 'string') {
        return subscription.customer;
    }

    return subscription.customer.id;
};

export const stripeSubscriptionToDbSubscription = (
    subscription: Stripe.Subscription
) => ({
    stripeSubscriptionId: subscription.id,
    trialEndsAt: DateFns.fromUnixTime(subscription.trial_end),
    startsAt: DateFns.fromUnixTime(subscription.start_date),
    nextRenewalAt: DateFns.fromUnixTime(subscription.trial_end),
    status: subscription.status,
    cancelAt: subscription.cancel_at
        ? DateFns.fromUnixTime(subscription.cancel_at)
        : null,
});
