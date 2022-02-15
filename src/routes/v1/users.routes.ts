import { Router } from 'express';

import { CreateUserController } from '@controllers/users/CreateUserController';

const routerUsers = Router();

const createUserController = new CreateUserController();

routerUsers.post('/users', createUserController.handle);

export { routerUsers };
