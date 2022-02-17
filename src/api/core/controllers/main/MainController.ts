import { NextFunction, Request, Response } from 'express';

/**
 * @type IMainRequestResponse
 */
export type IMainRequestResponse = {
  version: string;
  repository: string;
  author: {
    name: string;
    github: string;
  };
  info: {
    status: string;
    date: Date | string;
  };
};

/**
 * @class MainController
 */
export class MainController {
  /** @method handle - main method: `express handle` */
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const api: IMainRequestResponse = {
        version: '1.0.0',
        author: {
          name: 'José Lucas',
          github: 'lucasbernardol',
        },
        repository: 'https://github.com/lucasbernardol/tasks-api',
        info: {
          status: 'working',
          date: new Date().toLocaleString(),
        },
      };

      return response.json({ api });
    } catch (error) {
      return next(error);
    }
  }
}
