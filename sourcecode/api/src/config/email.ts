const emailConfig = {
    sendgridKey: process.env.SENDGRID_KEY,
    fromInfo: {
        email: 'no-reply@mysecondbrain.ai',
        name: 'My Second Brain',
    },
};

export default emailConfig;
