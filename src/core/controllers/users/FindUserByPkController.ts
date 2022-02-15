import { NextFunction, Request, Response } from 'express';

import { FindUserByPkServices } from '@services/users/FindUserByPkServices';

/**
 * @class FindUserByPkController
 */
export class FindUserByPkController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id: uuid } = request.params;

      const services = new FindUserByPkServices();

      const account = await services.execute(uuid);

      return response.json(account);
    } catch (error) {
      return next(error);
    }
  }
}
