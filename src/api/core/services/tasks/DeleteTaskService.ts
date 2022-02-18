import { getCustomRepository } from 'typeorm';

import { TaskRepositories } from '@repositories/TaskRepositories';

/**
 * @class DeleteTaskService
 */
export class DeleteTaskService {
  public constructor(
    public repositories = getCustomRepository(TaskRepositories)
  ) {}

  /** @method execute - main method */
  async execute(id: string) {
    const deletedResult = await this.repositories.delete(id);

    return {
      deleted: Boolean(deletedResult.affected),
    };
  }
}
