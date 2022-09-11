import Express, { Response } from 'express';
import runAsync from '../../services/runAsync';
import { CustomRequest } from '../../types/CustomRequest';
import stripe from '../../services/stripe';
import stripeConfig from '../../config/stripe';
import Unauthorized from '../../exceptions/unauthorized';
import express from 'express';
import { Stripe } from 'stripe';
import { handleSubscriptionEvent } from './subscription';
import logger from '../../services/logger';

const router = Express.Router();

router.post(
    '/stripe/webhook',
    express.raw({ type: 'application/json' }),
    runAsync(async (req: CustomRequest, res: Response) => {
        let event: Stripe.Event;
        try {
            const signature = req.headers['stripe-signature'];
            event = stripe.webhooks.constructEvent(
                req.rawBody,
                signature,
                stripeConfig.endpointSecret
            );
        } catch (err) {
            logger.error(
                `⚠️  Webhook signature verification failed.`,
                err.message
            );
            throw new Unauthorized('Invalid stripe request');
        }

        logger.info(event);
        switch (event.type) {
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted':
                return {
                    success: await handleSubscriptionEvent(
                        req.context,
                        event.data.object as Stripe.Subscription
                    ),
                };
            default:
                logger.error(`Unhandled event type ${event.type}`);
        }

        return {
            success: false,
        };
    })
);

export default router;
