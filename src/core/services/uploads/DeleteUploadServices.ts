import { getCustomRepository } from 'typeorm';
import { BadRequest } from 'http-errors';
import { resolve } from 'path';

import { tempPath } from '@constants/path';
import { deleteFileSync } from '@utils/deleteFile';
import { UploadRepositories } from '@repositories/UploadRepositories';

/**
 * @class DeleteUploadServices
 */
export class DeleteUploadServices {
  public constructor(
    public repositories = getCustomRepository(UploadRepositories)
  ) {}

  async execute(id: string) {
    const upload = await this.repositories.findOne(id);

    if (!upload) throw new BadRequest('Invalid upload!');

    /** Delete  */
    const deleteResult = await this.repositories.delete(id);

    const deleted = Boolean(deleteResult.affected);

    /** @TODO delete from local `disk` */
    const filePath = resolve(tempPath, upload.filename);

    if (deleted) {
      deleteFileSync(filePath);
    }

    return {
      deleted,
    };
  }
}
