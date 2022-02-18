import { Request, Response, NextFunction } from 'express';

import { ListUsersServices } from '@services/users/ListUsersServices';

export class ListUsersController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const services = new ListUsersServices();

      const users = await services.execute({ ...request.paging });

      return response.json(users);
    } catch (error) {
      return next(error);
    }
  }
}
