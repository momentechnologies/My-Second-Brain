export default {
    isProd: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    url: process.env.CONFIG_APP_URL,
    apiUrl: process.env.CONFIG_API_URL,
    cookieDomain: process.env.CONFIG_API_COOKIE_DOMAIN,
    port: parseInt(process.env.PORT),
    sentryUrl: process.env.CONFIG_SENTRY_URL,
    bvMillToken: process.env.CONFIG_BV_MILL_TOKEN,
};
