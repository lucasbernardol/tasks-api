import { getCustomRepository } from 'typeorm';
import { BadRequest } from 'http-errors';

import { cloudinaryUploadDestroyHandle } from '@providers/cloudinary';
import { UploadRepositories } from '@repositories/UploadRepositories';

/**
 * @class DeleteUploadService
 */
export class DeleteUploadService {
  private message: string = 'Invalid upload!';

  public constructor(
    public repositories = getCustomRepository(UploadRepositories)
  ) {}

  public get getErrorMessage(): string {
    return this.message;
  }

  async execute(id: string) {
    const upload = await this.repositories.findOne({
      where: { id },
      select: ['id', 'public_id'],
    });

    /** @TODO validation  */
    const hasConflicUploadInDatabase = !upload;

    if (hasConflicUploadInDatabase) {
      throw new BadRequest(this.getErrorMessage);
    }

    /** @TODO Cloudinary remove  */
    const cloudinaryDestroyResult = await cloudinaryUploadDestroyHandle(
      upload.public_id
    );

    const deletion = await this.repositories.delete(id);

    const deleted = Boolean(deletion.affected);

    return {
      deleted,
      external: cloudinaryDestroyResult,
    };
  }
}
