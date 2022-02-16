declare namespace Express {
  export interface Request {
    user: {
      id: string;
      permissions: [string, string?];
      iat: number;
      exp: number;
    };

    paging: {
      page: number;
      limit: number;
    };
  }
}
