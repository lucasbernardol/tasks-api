import { getCustomRepository } from 'typeorm';
import { BadRequest } from 'http-errors';

import { ProjectRepositories } from '@repositories/ProjectRepositories';

/**
 * @interface IProjectDelete
 */
export interface IProjectDelete {
  owner_id: string;
  project_id: string;
}

/**
 * @class DeleteProjectsServices
 */
export class DeleteProjectService {
  public constructor(
    public repostiories = getCustomRepository(ProjectRepositories)
  ) {}

  /** @method execute - main method */
  async execute({ owner_id, project_id }: IProjectDelete) {
    const project = await this.repostiories.findOne({
      where: {
        id: project_id,
        owner_id,
      },
      select: ['id'],
    });

    /** @TODO Return a error message */
    if (!project) throw new BadRequest('Project not found!');

    const deletedResult = await this.repostiories.delete(project_id);

    return {
      deleted: Boolean(deletedResult.affected),
    };
  }
}
