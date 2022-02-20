import { NextFunction, Request, Response } from 'express';

import { CompletedTaskService } from '@services/tasks/CompletedTaskService';

/**
 * @class CompletedTaskController
 */
export class CompletedTaskController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const services = new CompletedTaskService();

      const updated = await services.execute(id);

      return response.json(updated);
    } catch (error) {
      return next(error);
    }
  }
}
