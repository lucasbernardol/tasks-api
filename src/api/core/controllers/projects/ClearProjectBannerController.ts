import { NextFunction, Request, Response } from 'express';

import { ClearProjectBannerService } from '@services/projects/ClearProjectBannerService';

/**
 * @class ClearProjectBannerController
 */
export class ClearProjectBannerController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const services = new ClearProjectBannerService();

      const updated = await services.execute(id);

      return response.json(updated);
    } catch (error) {
      return next(error);
    }
  }
}
