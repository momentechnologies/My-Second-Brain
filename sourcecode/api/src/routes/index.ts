import express from 'express';
import graphqlRoutes from '../graphql';
import addContextToRequest from '../middlewares/addContextToRequest';
import addUserToRequest from '../middlewares/addUserToRequest';
import file from './file';
import stripe from './stripe';

const { Router } = express;

const router = Router();
const apiRouter = Router();

apiRouter.use(graphqlRoutes);
apiRouter.use(file);
apiRouter.use(stripe);

apiRouter.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the My Second Brain API',
    });
});

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the My Second Brain API',
    });
});

router.use('/api', addContextToRequest, addUserToRequest, apiRouter);

export default router;
