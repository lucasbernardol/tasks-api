import { NextFunction, Request, Response } from 'express';

import { ListTasksServices } from '@services/tasks/ListTasksServices';

/**
 * @class ListTasksController
 */
export class ListTasksController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.user;

      const services = new ListTasksServices();

      const tasks = await services.execute(id, { ...request.paging });

      return response.json(tasks);
    } catch (error) {
      return next(error);
    }
  }
}
