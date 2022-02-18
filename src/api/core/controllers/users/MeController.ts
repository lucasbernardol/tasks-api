import { Request, Response, NextFunction } from 'express';

import { FindUserByIdService } from '@services/users/FindUserByIdService';

/**
 * @class MeController
 */
export class MeController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.user;

      const services = new FindUserByIdService();

      const me = await services.execute(id);

      return response.json(me);
    } catch (error) {
      return next(error);
    }
  }
}
