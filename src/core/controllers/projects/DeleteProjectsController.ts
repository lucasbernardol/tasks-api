import { NextFunction, Request, Response } from 'express';

import { DeleteProjectsServices } from '@services/projects/DeleteProjectsServices';

/**
 * @class  DeleteProjectController
 */
export class DeleteProjectsController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id: project_id } = request.params;

      const { id } = request.user;

      const services = new DeleteProjectsServices();

      const deleted = await services.execute({
        owner_id: id,
        project_id,
      });

      return response.json(deleted);
    } catch (error) {
      return next(error);
    }
  }
}
