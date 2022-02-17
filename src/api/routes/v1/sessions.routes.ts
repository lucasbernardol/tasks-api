import { Router } from 'express';
import { AuthenticateController } from '@controllers/sessions/AuthenticateController';

const routes = Router();

const controller = new AuthenticateController();

routes.post('/sessions', controller.handle);

export { routes as sessionsRoutes };
