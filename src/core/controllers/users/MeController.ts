import { Request, Response, NextFunction } from 'express';

import { FindUserByPkServices } from '@services/users/FindUserByPkServices';

/**
 * @class MeController
 */
export class MeController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.user;

      const services = new FindUserByPkServices();

      const me = await services.execute(id);

      return response.json(me);
    } catch (error) {
      return next(error);
    }
  }
}
