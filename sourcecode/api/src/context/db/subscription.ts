import DataLoader from 'dataloader';
import { repositoryHelpers } from '../../services/db';
import { Knex } from 'knex';
import { DefaultFields } from '../../services/db/repositoryHelpers';

const tableName = 'subscriptions';

export type SubscriptionWithoutId = {
    userId: number;
    stripeSubscriptionId?: string;
    startsAt: Date;
    cancelAt?: Date;
    status:
        | 'active'
        | 'past_due'
        | 'unpaid'
        | 'canceled'
        | 'incomplete'
        | 'incomplete_expired'
        | 'trialing';
    trialEndsAt: Date;
    nextRenewalAt: Date;
};

export interface Subscription extends DefaultFields, SubscriptionWithoutId {}
const activeStatuses = ['active', 'trialing'];

export default (db: Knex) => {
    return {
        ...repositoryHelpers.setupDefaultRepository<
            SubscriptionWithoutId,
            Subscription
        >(tableName, db),
        getActiveByUserId: new DataLoader(async (userIds: number[]) => {
            const subscriptions = await db<Subscription>(tableName)
                .whereIn('userId', userIds)
                .whereIn('status', activeStatuses);

            return userIds.map((userId) =>
                subscriptions.find(
                    (subscription) => subscription.userId === userId
                )
            );
        }),
        getByStripeSubscriptionId: new DataLoader(
            async (stripeSubscriptionIds: string[]) => {
                const subscriptions = await db<Subscription>(tableName).whereIn(
                    'stripeSubscriptionId',
                    stripeSubscriptionIds
                );

                return stripeSubscriptionIds.map((stripeSubscriptionId) =>
                    subscriptions.find(
                        (subscription) =>
                            subscription.stripeSubscriptionId ===
                            stripeSubscriptionId
                    )
                );
            }
        ),
    };
};
