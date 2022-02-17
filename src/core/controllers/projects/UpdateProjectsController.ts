import { NextFunction, Request, Response } from 'express';

import { UpdateProjectsServices } from '@services/projects/UpdateProjectsServices';

/**
 * @class UpdateProjectsController
 */
export class UpdateProjectsController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id: project_id } = request.params;

      const { title, subtitle, description } = request.body;

      const services = new UpdateProjectsServices();

      const updated = await services.execute(project_id, {
        title,
        subtitle,
        description,
      });

      return response.json(updated);
    } catch (error) {
      return next(error);
    }
  }
}
