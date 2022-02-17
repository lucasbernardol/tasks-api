import { DeleteUploadServices } from '@services/uploads/DeleteUploadServices';
import { NextFunction, Request, Response } from 'express';

/**
 * @class DeleteUploadController
 */
export class DeleteUploadController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const services = new DeleteUploadServices();

      const deleted = await services.execute(id);

      return response.json(deleted);
    } catch (error) {
      return next(error);
    }
  }
}
