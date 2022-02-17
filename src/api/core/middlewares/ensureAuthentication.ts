import expressJwt, { RequestHandler } from 'express-jwt';
import expressPermissions from 'express-jwt-permissions';

import config from '@config/env';

/**
 * @function ensureAuthentication - `express handle`
 */
export function ensureAuthentication(): RequestHandler {
  return expressJwt({
    secret: config.jwt.secret,
    algorithms: ['HS256'],
    credentialsRequired: true,
  });
}

/**
 * @param name - permission name, example: `admin` or `root`
 * @function validatePermission - `express handle`
 */
export function validatePermission(name: string) {
  return expressPermissions().check(name);
}
