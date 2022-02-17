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

  async execute(options: IProjectDelete) {
    const { owner_id, project_id } = options;

    /** @TODO validation */
    const isValidProjectOwner = await this.repostiories.findOne({
      where: {
        id: project_id,
        owner_id, // Authenticated user
      },
    });

    if (!isValidProjectOwner) {
      /** Return a error message */
      throw new BadRequest('Project not found!');
    }

    const deleteResult = await this.repostiories.delete(project_id);

    const deleted = Boolean(deleteResult.affected);

    return {
      deleted,
    };
  }
}
