import { getCustomRepository } from 'typeorm';

import { TaskRepositories } from '@repositories/TaskRepositories';

/**
 * @interface ITaskUpdate
 */
export interface ITaskUpdate {
  name: string;
  details: string;
}

/**
 * @class UpdateTaskService
 */
export class UpdateTaskService {
  public constructor(
    public repositories = getCustomRepository(TaskRepositories)
  ) {}

  /** @method execute */
  // prettier-ignore
  async execute(id: string, options: ITaskUpdate): Promise<{ updated: boolean }> {
    const { name, details } = options;

    const updateResult = await this.repositories.update(id, {
      name,
      details,
    });

    return {
      updated: Boolean(updateResult.affected),
    };
  }
}
