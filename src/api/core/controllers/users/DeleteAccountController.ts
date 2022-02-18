import { NextFunction, Request, Response } from 'express';

import { DeleteUserAccountService } from '@services/users/DeleteUserAccountService';

/**
 * @class DeleteAccountController
 */
export class DeleteAccountController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.user;

      const { password } = request.body;

      const services = new DeleteUserAccountService();

      const deleted = await services.execute({ id, password });

      return response.json(deleted);
    } catch (error) {
      return next(error);
    }
  }
}
