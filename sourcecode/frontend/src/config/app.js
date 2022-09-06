import getEnvVariable from '../helpers/getEnvVariable';

const appConfig = {
    stripePublicUrl: getEnvVariable('REACT_APP_STRIPE_PUBLIC_KEY'),
};

export default appConfig;
