import { Router } from 'express';

import { CreateUserController } from '@controllers/users/CreateUserController';
import { ListUsersController } from '@controllers/users/ListUsersController';

const routerUsers = Router();

const listUsersController = new ListUsersController();

routerUsers.get('/users', listUsersController.handle);

const createUserController = new CreateUserController();

routerUsers.post('/users', createUserController.handle);

export { routerUsers };
