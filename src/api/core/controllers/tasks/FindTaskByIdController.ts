import { NextFunction, Request, Response } from 'express';

import { FindTaskByIdService } from '@services/tasks/FindTaskByIdService';

/**
 * @class FindTasksByIdController
 */
export class FindTaskByIdController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const services = new FindTaskByIdService();

      const task = await services.execute(id);

      return response.json(task);
    } catch (error) {
      return next(error);
    }
  }
}
