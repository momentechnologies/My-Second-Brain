exports.up = async (knex) => {
    await knex.schema.table('tasks', function (table) {
        table
            .enum('list', ['doNext', 'delegated', 'someday', 'specificDate'])
            .nullable();
        table.timestamp('listSpecificDateDate', { useTz: true }).nullable();
        table.timestamp('remindMeAt', { useTz: true }).nullable();
        table.dropColumn('context');
    });
};

exports.down = async (knex) => {
    await knex.schema.table('tasks', (table) => {
        table.enum('context', ['doNext', 'delegated', 'someday']).nullable();
        table.dropColumn('list');
        table.dropColumn('listSpecificDateDate');
        table.dropColumn('remindMeAt');
    });
};
