import multer, { Options } from 'multer';
import createHttpError from 'http-errors';

import crypto from 'crypto';
import path from 'path';

import { filesUploadsDirectory } from '@constants/path';

import {
  multerFilenameSizeInBytes,
  mimetypes,
  multerFileSizeInBytes,
} from '@constants/file';

const options: Options = {
  storage: multer.diskStorage({
    destination: filesUploadsDirectory,
    filename: (request, file, callback) => {
      crypto.randomBytes(multerFilenameSizeInBytes, (error, buffer) => {
        if (error) return callback(error, null);

        const bufferToStringHex = buffer.toString('hex');

        const filename = bufferToStringHex + path.extname(file.originalname);

        return callback(null, filename);
      });
    },
  }),

  limits: {
    /** Size: 2MB */
    fileSize: multerFileSizeInBytes,
  },

  fileFilter: (request, file, callback) => {
    const { mimetype: fileMimetype } = file;

    const fileMimetypeIsSupported = mimetypes.some(
      (mimetype) => mimetype === fileMimetype.toLowerCase()
    );

    /** @TODO Return a error message */
    if (!fileMimetypeIsSupported) {
      const extras = {
        supported: mimetypes,
      };

      return callback(
        createHttpError(400, `Invalid mimetype: ${fileMimetype}`, extras)
      );
    }

    return callback(null, true);
  },
};

export { options };
