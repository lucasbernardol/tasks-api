import { NextFunction, Request, Response } from 'express';

import { ClearUserAvatarService } from '@services/users/ClearUserAvatarService';

/**
 * @class ClearUserAvatarController
 */
export class ClearUserAvatarController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.user;

      const services = new ClearUserAvatarService();

      const updated = await services.execute(id);

      return response.json(updated);
    } catch (error) {
      return next(error);
    }
  }
}
