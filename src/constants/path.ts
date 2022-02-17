import { resolve } from 'path';

/**
 * @constant filesUploadsDirectory
 */
export const filesUploadsDirectory = resolve(
  __dirname,
  '..',
  '..',
  'temp',
  'uploads'
);
