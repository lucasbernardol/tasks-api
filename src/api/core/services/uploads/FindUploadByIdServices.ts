import { instanceToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';

import { UploadRepositories } from '@repositories/UploadRepositories';

/**
 * @class FindUploadByIdServices
 */
export class FindUploadByIdServices {
  public constructor(
    public repositories = getCustomRepository(UploadRepositories)
  ) {}

  async execute(id: string) {
    const upload = await this.repositories.findOne({ id });

    return instanceToPlain(upload) ?? null;
  }
}
