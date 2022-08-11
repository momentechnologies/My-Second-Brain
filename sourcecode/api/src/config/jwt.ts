export default {
    secret: process.env.CONFIG_JWT_SECRET || 'somekey',
    tokenVersion: 1,
};
