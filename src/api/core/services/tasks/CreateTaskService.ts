import { getCustomRepository } from 'typeorm';
import { BadRequest } from 'http-errors';

import { TaskRepositories } from '@repositories/TaskRepositories';
import { ProjectRepositories } from '@repositories/ProjectRepositories';

export interface ITask {
  id?: string;
  name: string;
  details: string;
  completed?: boolean;
  finish_date: number;
  owner_id: string;
  project_id: string;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * @class CreateTaskService
 */
export class CreateTaskService {
  public constructor(
    public repositories = getCustomRepository(TaskRepositories),
    private projectRepositories = getCustomRepository(ProjectRepositories)
  ) {}

  async execute(task: ITask) {
    const { name, details, finish_date, owner_id, project_id } = task;

    /** Filter   */
    const filter = { id: project_id, owner_id };

    const project = await this.projectRepositories.findOne({
      where: filter,
      select: ['id'],
    });

    /** @TODO Return a error message */
    if (!project) throw new BadRequest('Invalid project or user!');

    const taskInstance = this.repositories.create({
      name,
      details,
      finish_date,
      owner_id,
      project_id,
    });

    return await this.repositories.save(taskInstance);
  }
}
