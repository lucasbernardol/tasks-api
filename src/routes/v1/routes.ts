import { Router } from 'express';

import { MainController } from '@controllers/main/MainController';

import { userRouter } from './users.routes';
import { sessionRouter } from './sessions.routes';

const routes = Router();

const controller = new MainController();

routes.get('/', controller.handle);

/**
 * Load routers
 */
routes.use('/api', userRouter);
routes.use('/api', sessionRouter);

export { routes };
