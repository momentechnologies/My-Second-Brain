exports.up = async (knex) => {
    await knex.schema.table('tasks', function (table) {
        table.enum('context', ['doNext', 'delegated', 'someday']).nullable();
        table.timestamp('dueAt', { useTz: true }).nullable();
    });
};

exports.down = async (knex) => {
    await knex.schema.table('tasks', (table) => {
        table.dropColumn('context');
        table.dropColumn('dueAt');
    });
};
