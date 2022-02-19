import cloudinary, { UploadApiOptions } from 'cloudinary';

import { deleteFileSync } from '@shared/utils/deleteFileSync';
import config from '@config/env';

const cloudinaryProvider = cloudinary.v2;

const cloudinaryConfig = config.cloudinary;

export interface CloudinaryDestroy {
  resource_type?: string;
  type?: string;
  invalidate?: boolean;
}

/**
 * - Cloudinary load keys/secrets
 */
cloudinaryProvider.config({
  cloud_name: cloudinaryConfig.cloudinary_name,
  api_key: cloudinaryConfig.cloudinary_key,
  api_secret: cloudinaryConfig.cloudinary_secret,
});

/**
 * @function cloudinayUploaderHandle
 */
async function cloudinayUploaderHandle(path: string, e: UploadApiOptions = {}) {
  /** cloudinary folder name, @default 'assets'  */
  const folderName = 'assets';

  const cloudinaryOptions: UploadApiOptions = { folder: folderName, ...e };

  const cloudinaryUploaded = await cloudinaryProvider.uploader.upload(
    path,
    cloudinaryOptions
  );

  /** Remove: `local disk`  */
  deleteFileSync(path);

  return cloudinaryUploaded;
}

/**
 * @function cloudinaryUploadDestroyHandle
 */
async function cloudinaryUploadDestroyHandle(
  public_id: string,
  options: CloudinaryDestroy = {}
) {
  const mergedDestroyOptions: CloudinaryDestroy = { ...options };

  const cloudinaryDeletion = await cloudinaryProvider.uploader.destroy(
    public_id,
    mergedDestroyOptions
  );

  return cloudinaryDeletion;
}

export {
  cloudinayUploaderHandle,
  cloudinaryProvider,
  cloudinaryUploadDestroyHandle,
};
