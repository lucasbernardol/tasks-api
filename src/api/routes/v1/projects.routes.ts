import { Router } from 'express';

import { ListProjectsController } from '@controllers/projects/ListProjectsController';
import { FindProjectsByIdController } from '@controllers/projects/FindProjectsByIdController';
import { FindProjectsByTagController } from '@controllers/projects/FindProjectsByTagController';

import { CreateProjectsController } from '@controllers/projects/CreateProjectsController';
import { CompletedProjectController } from '@controllers/projects/CompletedProjectController';

import { UpdateProjectsController } from '@controllers/projects/UpdateProjectsController';
import { DeleteProjectsController } from '@controllers/projects/DeleteProjectsController';

import { ensureAuthentication } from '@middlewares/ensureAuthentication';

const routes = Router();
const secure = ensureAuthentication();

/** Controllers  */
const listController = new ListProjectsController();
const findByIdController = new FindProjectsByIdController();
const findByTagController = new FindProjectsByTagController();

const createController = new CreateProjectsController();
const completedController = new CompletedProjectController();

const updateController = new UpdateProjectsController();
const deleteController = new DeleteProjectsController();

/** Routes  */
routes.get('/projects', secure, listController.handle);
routes.get('/projects/:id', secure, findByIdController.handle);
routes.get('/projects/tag/:id', secure, findByTagController.handle);

routes.post('/projects', secure, createController.handle);

routes.put('/projects/completed/:id', secure, completedController.handle);
routes.put('/projects/:id', secure, updateController.handle);

routes.delete('/projects/:id', secure, deleteController.handle);

export { routes as projectsRoutes };
