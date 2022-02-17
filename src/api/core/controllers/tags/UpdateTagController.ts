import { NextFunction, Request, Response } from 'express';

import { UpdateTagServices } from '@services/tags/UpdateTagServices';

/**
 * @class UpdateTagController
 */
export class UpdateTagController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const { name, description } = request.body;

      const services = new UpdateTagServices();

      const updated = await services.execute(id, { name, description });

      return response.json(updated);
    } catch (error) {
      return next(error);
    }
  }
}
