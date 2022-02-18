import { Response, Request, NextFunction } from 'express';

import { UpdateTaskService } from '@services/tasks/UpdateTaskServices';

/**
 * @class UpdateTaskController
 */
export class UpdateTaskController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const { name, details } = request.body;

      const services = new UpdateTaskService();

      const updated = await services.execute(id, {
        name,
        details,
      });

      return response.json(updated);
    } catch (error) {
      return next(error);
    }
  }
}
