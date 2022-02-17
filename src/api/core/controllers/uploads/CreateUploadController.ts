import { NextFunction, Request, Response } from 'express';

import { CreateUploadServices } from '@services/uploads/CreateUploadService';

export class CreateUploadController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.user;

      const { filename, originalname, size, mimetype } = request.file;

      const services = new CreateUploadServices();

      const upload = await services.execute({
        owner_id: id,
        filename,
        originalname,
        bytes: size,
        mimetype,
      });

      return response.status(201).json(upload);
    } catch (error) {
      return next(error);
    }
  }
}
