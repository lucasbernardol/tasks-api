import { Router } from 'express';
import multer from 'multer';

import { ListUploadsController } from '@controllers/uploads/ListUploadsController';
import { FindUploadByIdController } from '@controllers/uploads/FindUploadByIdController';

import { CreateUploadController } from '@controllers/uploads/CreateUploadController';
import { DeleteUploadController } from '@controllers/uploads/DeleteUploadController';

import { ensureAuthentication } from '@middlewares/ensureAuthentication';
import { options } from '@config/multer';

/** Single file upload  */
const multerCreateHandle = multer(options);
const singleUpload = multerCreateHandle.single('file');

const secure = ensureAuthentication();

const routes = Router();

const listController = new ListUploadsController();
const findByIdController = new FindUploadByIdController();

const createController = new CreateUploadController();
const deleteController = new DeleteUploadController();

/** Routes */
routes.get('/uploads', secure, listController.handle);
routes.get('/uploads/:id', secure, findByIdController.handle);

routes.post('/uploads', secure, singleUpload, createController.handle);
routes.delete('/uploads/:id', secure, deleteController.handle);

export { routes as uploadsRoutes };
