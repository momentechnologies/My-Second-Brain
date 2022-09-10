exports.up = async (knex) => {
    await knex.schema.table('users', function (table) {
        table.string('stripeCustomerId').nullable();
    });
    await knex.schema.createTable('subscriptions', function (table) {
        table.increments('id').primary();
        table.string('stripeSubscriptionId').notNullable().unique();
        table
            .integer('userId')
            .unsigned()
            .references('id')
            .inTable('users')
            .notNullable();
        table
            .enum('status', [
                'active',
                'past_due',
                'unpaid',
                'canceled',
                'incomplete',
                'incomplete_expired',
                'trialing',
            ])
            .notNullable();
        table.timestamp('startsAt', { useTz: true }).notNullable();
        table.timestamp('trialEndsAt', { useTz: true }).notNullable();
        table.timestamp('nextRenewalAt', { useTz: true }).notNullable();
        table
            .timestamp('updatedAt', { useTz: true })
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .timestamp('createdAt', { useTz: true })
            .notNullable()
            .defaultTo(knex.fn.now());
    });
};

exports.down = async (knex) => {
    await knex.schema.table('users', (table) => {
        table.dropColumn('stripeCustomerId');
    });
    await knex.schema.dropTable('subscriptions');
};
