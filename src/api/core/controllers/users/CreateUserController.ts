import { NextFunction, Request, Response } from 'express';

import { CreateUserService } from '@services/users/CreateUserService';

/**
 * @class CreateUserController
 */
export class CreateUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, full_name, email, password } = request.body;

      const services = new CreateUserService();

      const userAccount = await services.execute({
        name,
        full_name,
        email,
        password,
      });

      return response.status(201).json(userAccount);
    } catch (error) {
      return next(error);
    }
  }
}
