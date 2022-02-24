import { NextFunction, Request, Response } from 'express';

import { CreateProjectService } from '@services/projects/CreateProjectService';

/**
 * @class CreateProjectController
 */
export class CreateProjectController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { title, subtitle, description, tag_id } = request.body;

      const { id } = request.user;

      const services = new CreateProjectService();

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
