import { Router } from 'express';
import expressJwt from 'express-jwt';
import expressPermissions from 'express-jwt-permissions';

import { ListTagsController } from '@controllers/tags/ListTagsController';
import { FindTagByIdController } from '@controllers/tags/FindTagByIdController';
import { CreateTagController } from '@controllers/tags/CreateTagController';
import { UpdateTagController } from '@controllers/tags/UpdateTagController';
import { DeleteTagController } from '@controllers/tags/DeleteTagController';

import config from '@config/env';

const tagRouter = Router();

const authenticated = expressJwt({
  secret: config.jwt.secret,
  algorithms: ['HS256'],
  credentialsRequired: true,
});

const check = expressPermissions().check('admin');

const listTagsController = new ListTagsController();
const findTagByIdController = new FindTagByIdController();
const createTagController = new CreateTagController();
const updateTagController = new UpdateTagController();
const deleteTagController = new DeleteTagController();

tagRouter.get('/tags', authenticated, listTagsController.handle);
tagRouter.get('/tags/:id', authenticated, findTagByIdController.handle);

tagRouter.put('/tags/:id', authenticated, check, updateTagController.handle);

/** Create: Admin only */
tagRouter.post('/tags', authenticated, check, createTagController.handle);
tagRouter.delete('/tags/:id', authenticated, check, deleteTagController.handle);

export { tagRouter };
