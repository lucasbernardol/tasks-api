import { Response, NextFunction, Request } from 'express';
import { UnauthorizedError } from 'express-jwt';
import PermissionDenied from 'express-jwt-permissions/error';

import { MulterError } from 'multer';
import { isHttpError, HttpError, NotFound } from 'http-errors';

import { multerFileSizeInBytes } from '@constants/file';

/**
 * @interface IError
 */
export interface IError {
  name: string;
  status: number;
  message: string;
  details?: any;
}

/**
 * @interface IMulterError
 */
export interface IMulterError extends MulterError {
  storageErrors: any[];
}

/**
 * @class Handler
 */
export class Handler {
  static instance: Handler;

  /**
   * @constructor - Private.
   */
  private constructor() {}

  static getHandlerInstance(): Handler {
    if (!this.instance) {
      this.instance = new Handler();
    }

    return this.instance;
  }

  /**
   * @method notFound - Not found: `exception`
   */
  public notFound() {
    return (_: any, response: Response, next: NextFunction) => {
      return next(new NotFound('Not found, are you lost?'));
    };
  }

  /**
   * @method multerHandler - Multer: `express handler`
   */
  public multerHandler() {
    return (err: IMulterError, _: any, response: Response, n: NextFunction) => {
      const status = 400;

      /** MulterError as BadRequestError */
      const name = 'BadRequestError';

      const actualErrorIsMulter = err instanceof MulterError;

      if (!actualErrorIsMulter) return n(err);

      const { message, name: _name, ...details } = err;

      /** Error codes  */
      switch (details.code) {
        case 'LIMIT_FILE_SIZE':
          details['size_bytes'] = multerFileSizeInBytes;

        default:
          delete details.storageErrors; // []
          delete details.code;
      }

      const error = { name, status, message, details };

      return response.status(status).json({ error });
    };
  }

  public AuthorizationHandler() {
    return (
      error: Error,
      request: Request,
      response: Response,
      next: NextFunction
    ) => {
      const isUnauthorized =
        error instanceof UnauthorizedError || error instanceof PermissionDenied;

      if (!isUnauthorized) {
        return next(error);
      }

      const { name, message, status, code: _, inner: _details } = error;

      const exception = { name, message, status };

      return response.status(status).json({ error: exception });
    };
  }

  /**
   * @method httpHanlder - Http errors: `express handler`
   */
  public httpHandler() {
    return (err: HttpError, _: any, response: Response, next: NextFunction) => {
      const actualErrorIsHttp = isHttpError(err);

      if (!actualErrorIsHttp) {
        const error = { message: 'Internal error' };
        console.log(error);

        return response.status(500).json({ error });
      }

      let { name, message, status, ...details } = err;

      delete details.storageErrors;

      const detailsKeysLessThanOne = Object.keys(details).length < 1;

      /** details: null */
      if (detailsKeysLessThanOne) details = null;

      const error = { name, status, message, details }; // {}

      return response.status(status).json({ error });
    };
  }
}

/**
 * @function createApplicationHanlders
 */
export function createApplicationHandler(): Handler {
  return Handler.getHandlerInstance();
}
