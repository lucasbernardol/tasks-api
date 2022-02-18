import { NextFunction, Request, Response } from 'express';

import { ListTasksByProjectServices } from '@services/tasks/ListTasksByProjectServices';

/**
 * @class ListTasksByProjectController
 */
export class ListTasksByProjectController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id: project_id } = request.params;

      const { id } = request.user;

      const services = new ListTasksByProjectServices();

      const tasks = await services.execute(
        {
          owner_id: id,
          project_id,
        },
        { ...request.paging }
      );

      return response.json(tasks);
    } catch (error) {
      return next(next);
    }
  }
}
