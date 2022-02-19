import { Router } from 'express';
import { celebrate } from 'celebrate';

import { ListUsersController } from '@controllers/users/ListUsersController';
import { FindUserByIdController } from '@controllers/users/FindUserByIdController';
import { MeController } from '@controllers/users/MeController';

import { SetUserAvatarController } from '@controllers/users/SetUserAvatarController';
import { ClearUserAvatarController } from '@controllers/users/ClearUserAvatarController';

import { CreateUserController } from '@controllers/users/CreateUserController';
import { DeleteAccountController } from '@controllers/users/DeleteAccountController';

import {
  ensureAuthentication,
  validatePermission,
} from '@middlewares/ensureAuthentication';

import schemas from '@validators/user.schema';

const routes = Router();

/** ['user', 'admin']  */
const onlyAdmin = validatePermission('admin');
const secure = ensureAuthentication();

const { deleteSchema, createSchema } = schemas.body;

/** Controllers */
const listController = new ListUsersController();
const meController = new MeController();

const findByIdController = new FindUserByIdController();

const clearAvatarController = new ClearUserAvatarController();
const setAvatarController = new SetUserAvatarController();

const signUpController = new CreateUserController();
const deleteController = new DeleteAccountController();

/** Routes */
routes.get('/users', secure, onlyAdmin, listController.handle);

routes.get('/users/me', secure, meController.handle);
routes.get('/users/:id', secure, findByIdController.handle);

routes.patch('/users/avatar/remove', secure, clearAvatarController.handle);
routes.patch('/users/avatar/:id', secure, setAvatarController.handle);

/** signUp - register  */
routes.post(
  '/users',
  celebrate({ body: createSchema }),
  signUpController.handle
);

routes.delete(
  '/users',
  secure,
  celebrate({ body: deleteSchema }),
  deleteController.handle
);

export { routes as usersRoutes };
