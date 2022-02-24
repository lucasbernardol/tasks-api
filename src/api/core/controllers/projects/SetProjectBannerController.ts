import { NextFunction, Request, Response } from 'express';

import { SetProjectBannerService } from '@services/projects/SetProjectBannerService';

/**
 * @class SetProjectBannerController
 */
export class SetProjectBannerController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { projectId, bannerId } = request.params;

      const services = new SetProjectBannerService();

      const updated = await services.execute({
        projectId,
        bannerId,
      });

      return response.json(updated);
    } catch (error) {
      return next(error);
    }
  }
}
