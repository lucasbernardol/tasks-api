/**
 * @type Permission
 */
type Permission = [string, string?];

declare namespace Express {
  export interface Request {
    user: {
      id: string;
      permissions: Permission;
      iat: number;
      exp: number;
    };

    paging: {
      page: number;
      limit: number;
    };
  }
}
