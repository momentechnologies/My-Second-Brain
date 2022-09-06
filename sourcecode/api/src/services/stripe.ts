import Stripe from 'stripe';
import stripeConfig from '../config/stripe';

export default new Stripe(stripeConfig.privateKey, {
    apiVersion: '2022-08-01',
});
