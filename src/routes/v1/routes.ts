import { Router } from 'express';
import { MainController } from '@controllers/main/MainController';

const routes = Router();

const controller = new MainController();

routes.get('/', controller.handle);

export { routes };
