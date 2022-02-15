import { Router } from 'express';

import { MainController } from '@controllers/main/MainController';

import { routerUsers } from './users.routes';

const routes = Router();

const controller = new MainController();

routes.get('/', controller.handle);

/**
 * Load routers
 */
routes.use('/api', routerUsers);

export { routes };
