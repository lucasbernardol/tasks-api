import { Router } from 'express';
import expressJwt from 'express-jwt';
import multer from 'multer';

import { ListUploadsController } from '@controllers/uploads/ListUploadsController';
import { FindUploadByIdController } from '@controllers/uploads/FindUploadByIdController';
import { CreateUploadController } from '@controllers/uploads/CreateUploadController';

import config from '@config/env';
import { options as multerOptions } from '@config/multer';
import { DeleteUploadController } from '@controllers/uploads/DeleteUploadController';

const authenticated = expressJwt({
  secret: config.jwt.secret,
  algorithms: ['HS256'],
  credentialsRequired: true,
});

const multerHandle = multer(multerOptions);

const uploadsRouter = Router();

const listUploadsController = new ListUploadsController();
const findUploadByIdController = new FindUploadByIdController();
const createUploadController = new CreateUploadController();
const delteUploadController = new DeleteUploadController();

uploadsRouter.get('/uploads', authenticated, listUploadsController.handle);

uploadsRouter.get(
  '/uploads/:id',
  authenticated,
  findUploadByIdController.handle
);

uploadsRouter.post(
  '/uploads',
  authenticated,
  multerHandle.single('file'),
  createUploadController.handle
);

uploadsRouter.delete(
  '/uploads/:id',
  authenticated,
  delteUploadController.handle
);

export { uploadsRouter };
