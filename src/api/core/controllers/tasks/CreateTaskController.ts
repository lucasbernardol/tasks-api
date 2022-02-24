import { NextFunction, Request, Response } from 'express';

import { CreateTaskService } from '@services/tasks/CreateTaskService';

/**
 * @class CreateTasksController
 */
export class CreateTaskController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, finish_date, details, project_id } = request.body;

      const { id: owner_id } = request.user;

      const services = new CreateTaskService();

      const task = await services.execute({
        name,
        details,
        finish_date,
        project_id,
        owner_id,
      });

      return response.status(201).json(task);
    } catch (error) {
      return next(error);
    }
  }
}
