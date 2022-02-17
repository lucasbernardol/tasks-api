import { NextFunction, Request, Response } from 'express';

import { AuthenticateServices } from '@services/sessions/AuthenticateServices';

/**
 * @class AuthenticateController
 */
export class AuthenticateController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, password } = request.body;

      const services = new AuthenticateServices();

      const authenticated = await services.execute({ email, password });

      return response.json(authenticated);
    } catch (error) {
      return next(error);
    }
  }
}
