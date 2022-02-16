import { NextFunction, Response, Request } from 'express';

/**
 * @function paging - Convert "page" and "limit" to number.
 */
export function paging() {
  return (request: Request, response: Response, next: NextFunction) => {
    const isGetMehtod = request.method === 'GET';

    /** Next handle */
    if (!isGetMehtod) return next();

    const { page, limit } = request.query;

    request.paging = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
    };

    return next();
  };
}
