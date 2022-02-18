import { getCustomRepository } from 'typeorm';
import { BadRequest } from 'http-errors';
import path from 'path';

import { UploadRepositories } from '@repositories/UploadRepositories';

import { filesUploadsDirectory } from '@constants/path';
import { deleteFileSync } from '@shared/utils/deleteFileSync';

/**
 * @class DeleteUploadService
 */
export class DeleteUploadService {
  private message: string = 'Invalid upload, no changes applied!';

  public constructor(
    public repositories = getCustomRepository(UploadRepositories)
  ) {}

  async execute(id: string) {
    const upload = await this.repositories.findOne({ id });

    if (!upload) throw new BadRequest(this.message);

    /** deletion  */
    const deletion = await this.repositories.delete(id);

    const deleted = Boolean(deletion.affected);

    /** @TODO local `disk` */
    const uploadFilePath = path.resolve(filesUploadsDirectory, upload.filename);

    if (deleted) deleteFileSync(uploadFilePath);

    return {
      deleted,
    };
  }
}
