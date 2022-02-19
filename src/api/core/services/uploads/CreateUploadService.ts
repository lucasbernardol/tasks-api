import { getCustomRepository } from 'typeorm';

import { cloudinayUploaderHandle } from '@providers/cloudinary';
import { UploadRepositories } from '@repositories/UploadRepositories';

/**
 * @interface IUpload
 */
export interface IUpload {
  filename: string;
  originalname: string;
  owner_id: string;
  mimetype: string;
  fullPath: string;
}

/**
 * @class CreateUploadService
 */
export class CreateUploadService {
  public constructor(
    public repositories = getCustomRepository(UploadRepositories)
  ) {}

  async execute(upload: IUpload) {
    const { filename, originalname, owner_id, mimetype, fullPath } = upload;

    /** Cloudinary upload  */
    const cloudinaryUploaded = await cloudinayUploaderHandle(fullPath);

    const { public_id, bytes, resource_type, width, height, secure_url } =
      cloudinaryUploaded;

    const uploadInstance = this.repositories.create({
      filename,
      originalname,
      mimetype,
      owner_id,
      public_id,
      bytes,
      resource_type,
      width,
      height,
      secure_url,
    });

    return await this.repositories.save(uploadInstance);
  }
}
