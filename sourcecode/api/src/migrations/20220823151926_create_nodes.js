exports.up = function (knex) {
    return knex.schema.createTable('nodes', function (table) {
        table.increments('id').primary();
        table
            .integer('userId')
            .unsigned()
            .references('id')
            .inTable('users')
            .notNullable();
        table
            .integer('parentNodeId')
            .unsigned()
            .references('id')
            .inTable('nodes')
            .nullable();
        table.text('name').notNullable();
        table.json('content').notNullable();
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
    return knex.schema.dropTable('nodes');
};
