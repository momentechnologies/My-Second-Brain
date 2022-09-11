exports.up = async (knex) => {
    await knex.schema.table('subscriptions', function (table) {
        table.timestamp('cancelAt', { useTz: true }).nullable();
    });
};

exports.down = async (knex) => {
    await knex.schema.table('subscriptions', (table) => {
        table.dropColumn('cancelAt');
    });
};
