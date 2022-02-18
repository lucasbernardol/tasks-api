import { NextFunction, Request, Response } from 'express';

import { DeleteTaskService } from '@services/tasks/DeleteTaskService';

/**
 * @class DeleteTaskController
 */
export class DeleteTaskController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const services = new DeleteTaskService();

      const deleted = await services.execute(id);

      return response.json(deleted);
    } catch (error) {
      return next(error);
    }
  }
}
