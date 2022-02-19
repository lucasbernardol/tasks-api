import { Router } from 'express';
import { celebrate } from 'celebrate';

import { AuthenticateController } from '@controllers/sessions/AuthenticateController';
import schemas from '@validators/user.schema';

const routes = Router();

const { signInSchema } = schemas.body;

const controller = new AuthenticateController();

/** Routes  */
routes.post('/sessions', celebrate({ body: signInSchema }), controller.handle);

export { routes as sessionsRoutes };
