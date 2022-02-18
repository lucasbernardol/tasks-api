import { instanceToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';

import { UploadRepositories } from '@repositories/UploadRepositories';

/**
 * @interface IUpload
 */
export interface IUpload {
  id?: string;
  filename: string;
  originalname: string;
  bytes: number;
  owner_id: string;
  mimetype: string;
  url?: string;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * @class CreateUploadService
 */
export class CreateUploadService {
  public constructor(
    public repositories = getCustomRepository(UploadRepositories)
  ) {}

  async execute(upload: IUpload): Promise<IUpload> {
    const { filename, originalname, bytes, owner_id, mimetype } = upload;

    const uploadInstance = this.repositories.create({
      filename,
      originalname,
      bytes,
      owner_id,
      mimetype,
    });

    const uploadInstanceSaved = await this.repositories.save(uploadInstance);

    return instanceToPlain(uploadInstanceSaved) as IUpload;
  }
}
