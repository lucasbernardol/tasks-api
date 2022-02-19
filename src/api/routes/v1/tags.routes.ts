import { Router } from 'express';
import { celebrate } from 'celebrate';

import { ListTagsController } from '@controllers/tags/ListTagsController';
import { FindTagByIdController } from '@controllers/tags/FindTagByIdController';

import { CreateTagController } from '@controllers/tags/CreateTagController';
import { UpdateTagController } from '@controllers/tags/UpdateTagController';

import { DeleteTagController } from '@controllers/tags/DeleteTagController';

import schemas from '@validators/tag.schema';

import {
  ensureAuthentication,
  validatePermission,
} from '@middlewares/ensureAuthentication';

const routes = Router();

/** Controllers */
const secure = ensureAuthentication();
const onlyAdmin = validatePermission('admin');

const { createSchema, updateSchema } = schemas.body;

const listController = new ListTagsController();
const findByIdController = new FindTagByIdController();

const createController = new CreateTagController();
const updateController = new UpdateTagController();
const deleteController = new DeleteTagController();

/** Routes  */
routes.get('/tags', secure, listController.handle);
routes.get('/tags/:id', secure, findByIdController.handle);

routes.put(
  '/tags/:id',
  secure,
  onlyAdmin,
  celebrate({ body: updateSchema }),
  updateController.handle
);

routes.post(
  '/tags',
  secure,
  onlyAdmin,
  celebrate({ body: createSchema }),
  createController.handle
);

routes.delete('/tags/:id', secure, onlyAdmin, deleteController.handle);

export { routes as tagsRouters };
