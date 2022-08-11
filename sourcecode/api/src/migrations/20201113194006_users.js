exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('firstName', 100).notNullable();
        table.string('lastName', 100).notNullable();
        table.string('email', 255).notNullable();
        table.boolean('emailConfirmed').defaultTo(false).notNullable();
        table.text('password').notNullable();
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
    return knex.schema.dropTable('users');
};
