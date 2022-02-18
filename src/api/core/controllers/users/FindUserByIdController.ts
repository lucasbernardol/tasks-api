import { NextFunction, Request, Response } from 'express';

import { FindUserByIdService } from '@services/users/FindUserByIdService';

/**
 * @class FindUserByPkController
 */
export class FindUserByIdController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const services = new FindUserByIdService();

      const user = await services.execute(id);

      return response.json(user);
    } catch (error) {
      return next(error);
    }
  }
}
