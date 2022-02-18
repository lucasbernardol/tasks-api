import { NextFunction, Request, Response } from 'express';

import { DeleteTagService } from '@services/tags/DeleteTagService';

/**
 * @class DeleteTagController
 */
export class DeleteTagController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const services = new DeleteTagService();

      const deleted = await services.execute(id);

      return response.json(deleted);
    } catch (error) {
      return next(error);
    }
  }
}
