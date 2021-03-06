import { NextFunction, Request, Response } from 'express';

import { UpdateTagService } from '@services/tags/UpdateTagService';

/**
 * @class UpdateTagController
 */
export class UpdateTagController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const { description, color } = request.body;

      const services = new UpdateTagService();

      const updated = await services.execute(id, { description, color });

      return response.json(updated);
    } catch (error) {
      return next(error);
    }
  }
}
