import { Request, Response, NextFunction } from 'express';

import { FindTagByIdService } from '@services/tags/FindTagByIdService';

/**
 * @class FindTagByIdController
 */
export class FindTagByIdController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const services = new FindTagByIdService();

      const tag = await services.execute(id);

      return response.json(tag);
    } catch (error) {
      return next(error);
    }
  }
}
