import { Router } from 'express';
import expressJwt from 'express-jwt';
import expressPermissions from 'express-jwt-permissions';

import { ListUsersController } from '@controllers/users/ListUsersController';
import { FindUserByIdController } from '@controllers/users/FindUserByIdController';
import { MeController } from '@controllers/users/MeController';
import { SetUserAvatarController } from '@controllers/users/SetUserAvatarController';
import { CreateUserController } from '@controllers/users/CreateUserController';
import { DeleteAccountController } from '@controllers/users/DeleteAccountController';

import config from '@config/env';
import { ClearUserAvatarController } from '@controllers/users/ClearUserAvatarController';

const userRouter = Router();

const authenticated = expressJwt({
  secret: config.jwt.secret,
  algorithms: ['HS256'],
  credentialsRequired: true,
});

const check = expressPermissions().check('admin'); // ['user', 'admin']

const listUsersController = new ListUsersController();
const meController = new MeController();
const findUserByIdController = new FindUserByIdController();
const setUserAvatarController = new SetUserAvatarController();
const clearUserAvatarController = new ClearUserAvatarController();
const createUserController = new CreateUserController();
const deleteAccountController = new DeleteAccountController();

userRouter.get('/users', authenticated, check, listUsersController.handle);
userRouter.get('/users/me', authenticated, meController.handle);
userRouter.get('/users/:id', authenticated, findUserByIdController.handle);

userRouter.patch(
  '/users/avatar/remove',
  authenticated,
  clearUserAvatarController.handle
);

userRouter.patch(
  '/users/avatar/:id',
  authenticated,
  setUserAvatarController.handle
);

userRouter.post('/users', createUserController.handle); // create
userRouter.delete('/users', authenticated, deleteAccountController.handle);

export { userRouter };
