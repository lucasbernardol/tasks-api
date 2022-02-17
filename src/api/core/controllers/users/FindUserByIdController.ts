import { NextFunction, Request, Response } from 'express';

import { FindUserByIdServices } from '@services/users/FindUserByIdServices';

/**
 * @class FindUserByPkController
 */
export class FindUserByIdController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id: uuid } = request.params;

      const services = new FindUserByIdServices();

      const account = await services.execute(uuid);

      return response.json(account);
    } catch (error) {
      return next(error);
    }
  }
}
