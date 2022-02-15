import { NextFunction, Request, Response } from 'express';

import { DeleteUserAccountServices } from '@services/users/DeleteUserAccountServices';

/**
 * @class DeleteAccountController
 */
export class DeleteAccountController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.user;

      const { password } = request.body;

      const services = new DeleteUserAccountServices();

      const deleted = await services.execute({ id, password });

      return response.json(deleted);
    } catch (error) {
      return next(error);
    }
  }
}
