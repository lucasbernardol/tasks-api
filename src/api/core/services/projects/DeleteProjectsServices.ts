import { getCustomRepository } from 'typeorm';
import { BadRequest } from 'http-errors';

import { ProjectRepositories } from '@repositories/ProjectRepositories';

export interface IProjectDelete {
  owner_id: string;
  project_id: string;
}

/**
 * @class DeleteProjectsServices
 */
export class DeleteProjectsServices {
  public constructor(
    public repostiories = getCustomRepository(ProjectRepositories)
  ) {}

  /** @method execute - main method */
  async execute(options: IProjectDelete) {
    const { owner_id, project_id } = options;

    const project = await this.repostiories.findOne({
      where: {
        id: project_id,
        owner_id,
      },

      select: ['id'],
    });

    if (!project) {
      /** @TODO Return a error message */
      throw new BadRequest('Project not found, no changes applied!');
    }

    const deleteResult = await this.repostiories.delete(project_id);

    return {
      deleted: Boolean(deleteResult.affected),
    };
  }
}
