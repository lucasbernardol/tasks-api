import { Request, Response, NextFunction } from 'express';

import { MeUserAccountService } from '@services/users/MeUserAccountService';

/**
 * @class MeController
 */
export class MeController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.user;

      const services = new MeUserAccountService();

      const me = await services.execute(id);

      return response.json(me);
    } catch (error) {
      return next(error);
    }
  }
}
