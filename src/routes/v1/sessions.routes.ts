import { Router } from 'express';
import { AuthenticateController } from '@controllers/sessions/AuthenticateController';

const sessionRouter = Router();

const controller = new AuthenticateController();

sessionRouter.post('/sessions', controller.handle);

export { sessionRouter };
