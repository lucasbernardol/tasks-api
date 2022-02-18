import { instanceToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { Conflict } from 'http-errors';

import path from 'path';

import { filesUploadsDirectory } from '@constants/path';
import { UploadRepositories } from '@repositories/UploadRepositories';

import { UserRepositories } from '@repositories/UserRepositories';
import { deleteFileSync } from '@shared/utils/deleteFileSync';

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
    public repositories = getCustomRepository(UploadRepositories),
    private usersRepositories = getCustomRepository(UserRepositories)
  ) {}

  async execute(upload: IUpload): Promise<IUpload> {
    const { filename, originalname, bytes, owner_id, mimetype } = upload;

    const account = await this.usersRepositories.findOne({
      where: {
        id: owner_id,
      },

      select: ['id'],
    });

    /** @TODO validate account  */
    if (!account) {
      const filePath = path.resolve(filesUploadsDirectory, filename);

      deleteFileSync(filePath);

      throw new Conflict('Invalid account!');
    }

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
