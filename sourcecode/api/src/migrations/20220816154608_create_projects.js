exports.up = function (knex) {
    return knex.schema.createTable('projects', function (table) {
        table.increments('id').primary();
        table
            .integer('userId')
            .unsigned()
            .references('id')
            .inTable('users')
            .notNullable();
        table.text('name').notNullable();
        table
            .enum('status', ['todo', 'doing', 'done', 'onHold', 'ongoing'])
            .defaultTo(false)
            .notNullable();
        table.boolean('isArchived').defaultTo(false).notNullable();
        table.timestamp('deadline', { useTz: true }).nullable();
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

exports.down = function (knex) {
    return knex.schema.dropTable('projects');
};
