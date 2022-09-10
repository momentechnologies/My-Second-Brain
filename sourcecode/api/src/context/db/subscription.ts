import DataLoader from 'dataloader';
import { repositoryHelpers } from '../../services/db';
import { Knex } from 'knex';

const tableName = 'subscriptions';

type Subscription = {
    userId: number;
    stripeSubscriptionId?: string;
    startsAt: Date;
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

const activeStatuses = ['active', 'trialing'];

export default (db: Knex) => {
    return {
        ...repositoryHelpers.setupDefaultRepository<Subscription>(
            tableName,
            db
        ),
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
    };
};
