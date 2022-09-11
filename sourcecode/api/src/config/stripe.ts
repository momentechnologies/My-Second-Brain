const stripeConfig = {
    publicKey: process.env.STRIPE_PUBLIC_KEY,
    privateKey: process.env.STRIPE_PRIVATE_KEY,
    endpointSecret: process.env.STRIPE_ENDPOINT_SECRET,
    subscriptionPriceIds: {
        standard: process.env.STRIPE_SUBSCRIPTION_PRICE_ID,
    },
};

export default stripeConfig;
