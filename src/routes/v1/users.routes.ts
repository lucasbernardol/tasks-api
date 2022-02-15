import { Router } from 'express';

import { CreateUserController } from '@controllers/users/CreateUserController';
import { ListUsersController } from '@controllers/users/ListUsersController';
import { FindUserByPkController } from '@controllers/users/FindUserByPkController';

const routerUsers = Router();

const listUsersController = new ListUsersController();
const findUserByIdController = new FindUserByPkController();
const createUserController = new CreateUserController();

routerUsers.get('/users', listUsersController.handle);
routerUsers.get('/users/:id', findUserByIdController.handle);
routerUsers.post('/users', createUserController.handle);

export { routerUsers };
