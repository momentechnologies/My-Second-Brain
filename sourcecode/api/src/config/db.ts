export default {
    host: process.env.CONFIG_DB_HOST || 'postgres',
    user: process.env.CONFIG_DB_USER || 'postgres',
    password: process.env.CONFIG_DB_PASSWORD || 'thepgpassword',
    database: process.env.CONFIG_DB_DATABASE || 'mysecondbrain',
    socketPath: process.env.CONFIG_DB_SOCKET_PATH,
    port: 5432,
};
