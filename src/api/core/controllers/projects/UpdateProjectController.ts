import { NextFunction, Request, Response } from 'express';

import { UpdateProjectService } from '@services/projects/UpdateProjectService';

/**
 * @class UpdateProjectsController
 */
export class UpdateProjectController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id: project_id } = request.params;

      const { title, subtitle, description } = request.body;

      const services = new UpdateProjectService();

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
