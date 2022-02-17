import { Router } from 'express';
import expressJwt from 'express-jwt';

import config from '@config/env';

import { ListProjectsController } from '@controllers/projects/ListProjectsController';
import { FindProjectsByIdController } from '@controllers/projects/FindProjectsByIdController';
import { CreateProjectsController } from '@controllers/projects/CreateProjectsController';
import { FindProjectsByTagController } from '@controllers/projects/FindProjectsByTagController';
import { CompletedProjectController } from '@controllers/projects/CompletedProjectController';
import { UpdateProjectsController } from '@controllers/projects/UpdateProjectsController';
import { DeleteProjectsController } from '@controllers/projects/DeleteProjectsController';

const projectRouter = Router();

const authenticated = expressJwt({
  secret: config.jwt.secret,
  algorithms: ['HS256'],
  credentialsRequired: true,
});

const listController = new ListProjectsController();
const findByIdController = new FindProjectsByIdController();
const findByTagController = new FindProjectsByTagController();
const createController = new CreateProjectsController();
const completedController = new CompletedProjectController();
const updateController = new UpdateProjectsController();
const deleteController = new DeleteProjectsController();

projectRouter.get('/projects', authenticated, listController.handle);
projectRouter.get('/projects/:id', authenticated, findByIdController.handle);

projectRouter.get(
  '/projects/tag/:id',
  authenticated,
  findByTagController.handle
);

projectRouter.post('/projects', authenticated, createController.handle);

projectRouter.put(
  '/projects/completed/:id',
  authenticated,
  completedController.handle
);

projectRouter.put('/projects/:id', authenticated, updateController.handle);
projectRouter.delete('/projects/:id', authenticated, deleteController.handle);

export { projectRouter };
