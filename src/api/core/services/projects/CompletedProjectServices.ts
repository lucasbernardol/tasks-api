import { getCustomRepository } from 'typeorm';
import { BadRequest } from 'http-errors';

import { ProjectRepositories } from '@repositories/ProjectRepositories';

/**
 * @class CompletedProjectServices
 */
export class CompletedProjectServices {
  public constructor(
    public repostirories = getCustomRepository(ProjectRepositories)
  ) {}

  async execute(id: string) {
    const project = await this.repostirories.findOne(id);

    if (!project) throw new BadRequest('Project not found!');

    /** true => false | false => true */
    const completed = !project.completed;

    const updateResult = await this.repostirories.update(id, {
      completed,
    });

    const updated = Boolean(updateResult.affected);

    return {
      updated,
    };
  }
}
