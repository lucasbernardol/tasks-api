import { NextFunction, Request, Response } from 'express';

export type MainRequestResponse = {
  version: string;
  author: {
    name: string;
    github: string;
  };
};

/**
 * @class MainController
 */
export class MainController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const apiResponse: MainRequestResponse = {
        version: '1.0.0',
        author: {
          name: 'José Lucas',
          github: 'lucasbernardol',
        },
      };

      return response.status(200).json(apiResponse);
    } catch (error) {
      return next(error);
    }
  }
}
