import { Context, ValidationErrorItem } from 'joi';
import { CelebrateError, isCelebrateError } from 'celebrate';

import { Response, Request, NextFunction } from 'express';

export interface Options {
  /**
   * @default 400
   */
  status?: number;
  /**
   * @default false
   */
  setCustomDetails?: boolean;

  /**
   * celebrate prefix: `body`, `headers`, `query`...
   */
  setPrefix?: boolean;
}

/**
 * Custom/normnalized celebrate details
 */
export interface Details {
  key: string;
  message: string;
  context: Context;
}

export class CelebrateHandler {
  private static instance: CelebrateHandler;

  private celebrateStatus: number = 400;

  /**
   * @private constructor
   */
  private constructor() {}

  static getInstance(): CelebrateHandler {
    if (!this.instance) {
      this.instance = new CelebrateHandler();
    }

    return this.instance;
  }

  public normalize(details: ValidationErrorItem[]): Details[] {
    return details.map((detail) => ({
      key: detail.path.toString(),
      message: detail.message,
      context: {
        key: detail.context.key,
        label: detail.context.label,
        value: detail.context.value,
        limit: detail.context?.limit,
      },
    }));
  }

  public celebrateKeys(details: ValidationErrorItem[]): string[] {
    return details.map(({ path }) => path.toString());
  }

  /**
   * - A custom `celebrate` validation middleware with `Joi`.
   */
  public mw(options: Options = {}) {
    const fixedCelebrateHttpStatus = this.celebrateStatus;

    const {
      status = fixedCelebrateHttpStatus,
      setCustomDetails,
      setPrefix,
    } = options;

    return (
      error: CelebrateError,
      request: Request,
      response: Response,
      next: NextFunction
    ) => {
      const isCelebrateValidationException = isCelebrateError(error);

      /** @TODO next handler  */
      if (!isCelebrateValidationException) {
        return next(error);
      }

      /** Express extras  */
      const extras = {
        path: request.path,
        method: request.method.toUpperCase(),
      };

      let exception = {};

      for (let [prefix, celebrateError] of error.details.entries()) {
        const { name, message, details: celebrateDetails } = celebrateError;

        let details: Details[];

        /** @TODO custom details  */
        if (setCustomDetails) {
          details = this.normalize(celebrateDetails);
        }

        const keys = this.celebrateKeys(celebrateDetails);

        const object = { name, message, keys, details };

        /** @example: { error: {} } or {}  */
        setPrefix ? (exception[prefix] = object) : (exception = object);
      }

      return response.status(status).json({ error: exception, extras });
    };
  }
}

/**
 * @function createCelebrateHandle
 */
export function createCelebrateHandle() {
  return CelebrateHandler.getInstance();
}
