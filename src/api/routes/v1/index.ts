import { Router } from 'express';
import { MainController } from '@controllers/main/MainController';

import { usersRoutes } from './users.routes';
import { sessionsRoutes } from './sessions.routes';

import { uploadsRoutes } from './uploads.routes';

import { tagsRouters } from './tags.routes';
import { projectsRoutes } from './projects.routes';

const routes = Router();

const controller = new MainController();

/** Public: "/" */
routes.get('/', controller.handle);

/**
 * @example: /api/users
 */
routes.use('/api', usersRoutes);

/**
 * @example: /api/sessions
 */
routes.use('/api', sessionsRoutes);

/**
 * @example: /api/tags
 */
routes.use('/api', tagsRouters);

/**
 * @example: /api/uploads
 */
routes.use('/api', uploadsRoutes);

/**
 * @example: /api/projects
 */
routes.use('/api', projectsRoutes);

export { routes };
