import { NextFunction, Response, Request } from 'express';

import { ListTagsServices } from '@services/tags/ListTagsServices';

/**
 * @class ListTagsController
 */
export class ListTagsController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { page, limit } = request.paging;

      const services = new ListTagsServices();

      const tags = await services.execute({ page, limit });

      return response.json(tags);
    } catch (error) {
      return next(error);
    }
  }
}
