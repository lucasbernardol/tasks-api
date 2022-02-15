interface AuthenticatedRequest {
  id: string;
  permissions: [string, string?];
  iat: number;
  exp: number;
}

declare namespace Express {
  export interface Request {
    user: AuthenticatedRequest;
  }
}
