import { getCustomRepository } from 'typeorm';
import { BadRequest } from 'http-errors';

import { TaskRepositories } from '@repositories/TaskRepositories';

/**
 * @class CompletedTaskService
 */
export class CompletedTaskService {
  public constructor(
    public repositories = getCustomRepository(TaskRepositories)
  ) {}

  async execute(id: string) {
    const task = await this.repositories.findOne({ id });

    if (!task) throw new BadRequest('Invalid task!');

    const completed = !task.completed;

    const updateResult = await this.repositories.update(id, {
      completed,
    });

    return {
      updated: Boolean(updateResult.affected),
    };
  }
}
