exports.up = function (knex) {
    return knex.schema.createTable('tasks', function (table) {
        table.increments('id').primary();
        table
            .integer('userId')
            .unsigned()
            .references('id')
            .inTable('users')
            .notNullable();
        table
            .integer('projectId')
            .unsigned()
            .references('id')
            .inTable('projects')
            .nullable();
        table.text('name').notNullable();
        table.boolean('isDone').defaultTo(false).notNullable();
        table.boolean('isArchived').defaultTo(false).notNullable();
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
    return knex.schema.dropTable('tasks');
};
