import { NextFunction, Request, Response } from 'express';

import { CreateTagServices } from '@services/tags/CreateTagServices';

/**
 * @class tagInstanceSaved
 */
export class CreateTagController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, description } = request.body;

      const services = new CreateTagServices();

      const tag = await services.execute({ name, description });

      return response.status(201).json(tag);
    } catch (error) {
      return next(error);
    }
  }
}
