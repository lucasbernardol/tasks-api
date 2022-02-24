import { Router } from 'express';
import { celebrate } from 'celebrate';

import { ListProjectsController } from '@controllers/projects/ListProjectsController';
import { FindProjectByIdController } from '@controllers/projects/FindProjectByIdController';
import { FindProjectsByTagController } from '@controllers/projects/FindProjectsByTagController';

import { SetProjectBannerController } from '@controllers/projects/SetProjectBannerController';
import { ClearProjectBannerController } from '@controllers/projects/ClearProjectBannerController';

import { CreateProjectController } from '@controllers/projects/CreateProjectController';
import { CompletedProjectController } from '@controllers/projects/CompletedProjectController';

import { UpdateProjectController } from '@controllers/projects/UpdateProjectController';
import { DeleteProjectController } from '@controllers/projects/DeleteProjectController';

import schemas from '@validators/project.schema';

import { ensureAuthentication } from '@middlewares/ensureAuthentication';

const routes = Router();
const secure = ensureAuthentication();

const { createSchema, updateSchema } = schemas.body;

/** Controllers  */
const listController = new ListProjectsController();
const findByIdController = new FindProjectByIdController();
const findByTagController = new FindProjectsByTagController();

const createController = new CreateProjectController();
const completedController = new CompletedProjectController();

const setBannerController = new SetProjectBannerController();
const clearBannerController = new ClearProjectBannerController();

const updateController = new UpdateProjectController();
const deleteController = new DeleteProjectController();

/** Routes  */
routes.get('/projects', secure, listController.handle);
routes.get('/projects/:id', secure, findByIdController.handle);
routes.get('/projects/tag/:id', secure, findByTagController.handle);

/**
 * - Toogle completed status
 */
routes.patch('/projects/completed/:id', secure, completedController.handle);

/**
 * - Clear banner
 * @example: api/projects/banner/{id}/
 */
routes.patch('/projects/banner/:id', secure, clearBannerController.handle);

/**
 * - Set banner
 * @example: api/projects/{projectId}/banner/{bannerId}/
 */
routes.patch(
  '/projects/:projectId/banner/:bannerId',
  secure,
  setBannerController.handle
);

routes.post(
  '/projects',
  secure,
  celebrate({ body: createSchema }),
  createController.handle
);

routes.put(
  '/projects/:id',
  secure,
  celebrate({ body: updateSchema }),
  updateController.handle
);

routes.delete('/projects/:id', secure, deleteController.handle);

export { routes as projectsRoutes };
