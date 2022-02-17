import { NextFunction, Request, Response } from 'express';

import { CompletedProjectServices } from '@services/projects/CompletedProjectServices';

/**
 * @class CompletedProjectController
 */
export class CompletedProjectController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const services = new CompletedProjectServices();

      const updated = await services.execute(id);

      return response.json(updated);
    } catch (error) {
      return next(error);
    }
  }
}
