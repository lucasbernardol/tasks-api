import { Request, Response, NextFunction } from 'express';

import { FindUserByIdServices } from '@services/users/FindUserByIdServices';

/**
 * @class MeController
 */
export class MeController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.user;

      const services = new FindUserByIdServices();

      const me = await services.execute(id);

      return response.json(me);
    } catch (error) {
      return next(error);
    }
  }
}
