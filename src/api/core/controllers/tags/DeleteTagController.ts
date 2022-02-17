import { NextFunction, Request, Response } from 'express';

import { DeleteTagServices } from '@services/tags/DeleteTagServices';

/**
 * @class DeleteTagController
 */
export class DeleteTagController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const services = new DeleteTagServices();

      const deleted = await services.execute(id);

      return response.json(deleted);
    } catch (error) {
      return next(error);
    }
  }
}
