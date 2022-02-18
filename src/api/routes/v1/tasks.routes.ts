import { Router } from 'express';

import { ListTasksController } from '@controllers/tasks/ListTasksController';
import { FindTaskByIdController } from '@controllers/tasks/FindTaskByIdController';
import { ListTasksByProjectController } from '@controllers/tasks/ListTasksByProjectController';

import { CreateTaskController } from '@controllers/tasks/CreateTaskController';
import { DeleteTaskController } from '@controllers/tasks/DeleteTaskController';

import { ensureAuthentication } from '@middlewares/ensureAuthentication';
import { UpdateTaskController } from '@controllers/tasks/UpdateTaskController';

const routes = Router();

const secure = ensureAuthentication();

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

routes.put('/tasks/:id', secure, updateController.handle);

routes.post('/tasks', secure, createController.handle);
routes.delete('/tasks/:id', secure, deleteController.handle);

export { routes as tasksRoutes };
