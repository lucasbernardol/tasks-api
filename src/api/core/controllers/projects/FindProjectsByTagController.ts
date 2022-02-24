import { NextFunction, Request, Response } from 'express';

import { FindProjectsByTagServices } from '@services/projects/FindProjectsByTagServices';

/**
 * @class FindProjectsByTagController
 */
export class FindProjectsByTagController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.user;
      const { id: tag_id } = request.params;

      const services = new FindProjectsByTagServices();

      const projects = await services.execute(
        { owner_id: id, tag_id },
        { ...request.paging }
      );

      return response.json(projects);
    } catch (error) {
      return next(error);
    }
  }
}
