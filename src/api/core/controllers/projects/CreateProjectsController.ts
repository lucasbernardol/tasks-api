import { NextFunction, Request, Response } from 'express';

import { CreateProjectsServices } from '@services/projects/CreateProjectsServices';

/**
 * @class CreateProjectController
 */
export class CreateProjectsController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { title, subtitle, description, tag_id } = request.body;

      const { id } = request.user;

      const services = new CreateProjectsServices();

      const project = await services.execute(id, {
        title,
        subtitle,
        description,
        tag_id,
      });

      return response.status(201).json(project);
    } catch (error) {
      return next(error);
    }
  }
}
