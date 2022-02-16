import { NextFunction, Request, Response } from 'express';

import { ListUploadsServices } from '@services/uploads/ListUploadsServices';

/**
 * @class ListUploadsController
 */
export class ListUploadsController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.user;

      const { page, limit } = request.paging;

      const services = new ListUploadsServices();

      const uploads = await services.execute(id, { page, limit });

      return response.json(uploads);
    } catch (error) {
      return next(error);
    }
  }
}
