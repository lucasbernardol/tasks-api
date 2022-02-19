import { NextFunction, Request, Response } from 'express';

import {
  IMainRequestResponse,
  IMainRequestExtras,
} from '@shared/types/IMainRequestResponse';

/**
 * @class MainController
 */
export class MainController {
  /**
   * @method handle - main method: `express handle`
   */
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const api: IMainRequestResponse = {
        version: '1.0.0',
        repository: 'https://github.com/lucasbernardol/tasks-api',
        author: {
          name: 'José Lucas',
          github: 'lucasbernardol',
        },
        status: 'working',
        date: Date.now(),
      };

      const extras: IMainRequestExtras = {
        host: request.hostname,
        path: request.path,
        method: request.method.toUpperCase(),
      };

      return response.json({ api, extras });
    } catch (error) {
      return next(error);
    }
  }
}
