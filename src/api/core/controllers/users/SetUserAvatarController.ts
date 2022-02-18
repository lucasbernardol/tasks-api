import { NextFunction, Request, Response } from 'express';

import { SetUserAvatarService } from '@services/users/SetUserAvatarService';

/**
 * @class SetUserAvatarController
 */
export class SetUserAvatarController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id: avatar_id } = request.params;

      const { id } = request.user;

      const services = new SetUserAvatarService();

      const updated = await services.execute({ user_id: id, avatar_id });

      return response.json(updated);
    } catch (error) {
      return next(error);
    }
  }
}
