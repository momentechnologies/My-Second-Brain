const stripeConfig = {
    publicKey: process.env.STRIPE_PUBLIC_KEY,
    privateKey: process.env.STRIPE_PRIVATE_KEY,
    subscriptionPriceIds: {
        standard: 'price_1LeiCrCGs7FowGNu7kvANuPr',
    },
};

export default stripeConfig;
