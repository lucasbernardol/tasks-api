import { getCustomRepository } from 'typeorm';

import { TaskRepositories } from '@repositories/TaskRepositories';

/**
 * @interface ITaskUpdate
 */
export interface ITaskUpdate {
  name: string;
  details: string;
  finish_date: number;
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
    const { name, details, finish_date } = options;

    const updateResult = await this.repositories.update(id, {
      name,
      details,
      finish_date
    });

    return {
      updated: Boolean(updateResult.affected),
    };
  }
}
