import { Request, Response, NextFunction } from 'express';

import { FindProjectsByIdServices } from '@services/projects/FindProjectsByIdServices';

/**
 * @class FindProjectByIdController
 */
export class FindProjectsByIdController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const services = new FindProjectsByIdServices();

      const project = await services.execute(id);

      return response.json(project);
    } catch (error) {
      return next(error);
    }
  }
}
