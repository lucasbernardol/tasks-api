import { Request, Response, NextFunction } from 'express';

import { FindProjectByIdService } from '@services/projects/FindProjectByIdService';

/**
 * @class FindProjectByIdController
 */
export class FindProjectByIdController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const services = new FindProjectByIdService();

      const project = await services.execute(id);

      return response.json(project);
    } catch (error) {
      return next(error);
    }
  }
}
