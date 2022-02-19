import { Router } from 'express';
import { celebrate } from 'celebrate';

import { ListTasksController } from '@controllers/tasks/ListTasksController';
import { FindTaskByIdController } from '@controllers/tasks/FindTaskByIdController';
import { ListTasksByProjectController } from '@controllers/tasks/ListTasksByProjectController';

import { CreateTaskController } from '@controllers/tasks/CreateTaskController';
import { DeleteTaskController } from '@controllers/tasks/DeleteTaskController';

import { UpdateTaskController } from '@controllers/tasks/UpdateTaskController';

import schemas from '@validators/task.schema';

import { ensureAuthentication } from '@middlewares/ensureAuthentication';

const routes = Router();

const secure = ensureAuthentication();

const { createSchema, updateSchema } = schemas.body;

/** Controllers  */
const listController = new ListTasksController();
const findByIdController = new FindTaskByIdController();
const listByProjectsController = new ListTasksByProjectController();

const createController = new CreateTaskController();
const updateController = new UpdateTaskController();

const deleteController = new DeleteTaskController();

/** Routers  */
routes.get('/tasks', secure, listController.handle);
routes.get('/tasks/:id', secure, findByIdController.handle);

// project_id
routes.get('/tasks/project/:id', secure, listByProjectsController.handle);

routes.put(
  '/tasks/:id',
  secure,
  celebrate({ body: updateSchema }),
  updateController.handle
);

routes.post(
  '/tasks',
  secure,
  celebrate({ body: createSchema }),
  createController.handle
);

routes.delete('/tasks/:id', secure, deleteController.handle);

export { routes as tasksRoutes };
