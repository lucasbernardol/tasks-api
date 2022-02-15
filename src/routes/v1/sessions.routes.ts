import { Router } from 'express';

import { AuthenticateController } from '@controllers/sessions/AuthenticateController';

const sessionRouter = Router();

const authenticateController = new AuthenticateController();

sessionRouter.post('/sessions', authenticateController.handle);

export { sessionRouter };
