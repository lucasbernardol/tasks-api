import { getCustomRepository } from 'typeorm';

import { TaskRepositories } from '@repositories/TaskRepositories';

/**
 * @class FindTaskByIdService
 */
export class FindTaskByIdService {
  public constructor(
    public repositories = getCustomRepository(TaskRepositories)
  ) {}

  /** @method execute - main method  */
  async execute(id: string) {
    const task = await this.repositories.findOne(id);

    return task ?? null;
  }
}
