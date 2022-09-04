export default {
    host: process.env.CONFIG_DB_HOST || 'postgres',
    user: process.env.CONFIG_DB_USER || 'postgres',
    password: process.env.CONFIG_DB_PASSWORD || 'thepgpassword',
    database: process.env.CONFIG_DB_DATABASE || 'mysecondbrain',
    // port: 5432,
};
