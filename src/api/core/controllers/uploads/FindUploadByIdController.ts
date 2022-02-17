import { NextFunction, Request, Response } from 'express';

import { FindUploadByIdServices } from '@services/uploads/FindUploadByIdServices';

/**
 * @class FindUploadByIdController
 */
export class FindUploadByIdController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const services = new FindUploadByIdServices();

      const upload = await services.execute(id);

      return response.json(upload);
    } catch (error) {
      return next(error);
    }
  }
}
