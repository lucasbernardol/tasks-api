import { NextFunction, Request, Response } from 'express';

import { CreateUploadService } from '@services/uploads/CreateUploadService';

export class CreateUploadController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.user;

      const { filename, originalname, mimetype, path } = request.file;

      const services = new CreateUploadService();

      const upload = await services.execute({
        owner_id: id,
        filename,
        originalname,
        mimetype,
        fullPath: path,
      });

      return response.status(201).json(upload);
    } catch (error) {
      return next(error);
    }
  }
}
