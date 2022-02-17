import { NextFunction, Request, Response } from 'express';

import { ListProjectsServices } from '@services/projects/ListProjectsServices';

/**
 * @class ListProjectsController
 */
export class ListProjectsController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.user;

      const services = new ListProjectsServices();

      const projects = await services.execute(id, { ...request.paging });

      return response.json(projects);
    } catch (error) {
      return next(error);
    }
  }
}
