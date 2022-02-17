import { getCustomRepository } from 'typeorm';

import { ProjectRepositories } from '@repositories/ProjectRepositories';

export interface IProject {
  title: string;
  subtitle: string;
  description: string;
}

/**
 * @class UpdateProjectsServices
 */
export class UpdateProjectsServices {
  public constructor(
    public repositories = getCustomRepository(ProjectRepositories)
  ) {}

  async execute(id: string, projectUpdate: IProject) {
    const { subtitle, description, title } = projectUpdate;

    const updateResult = await this.repositories.update(id, {
      subtitle,
      description,
      title,
    });

    const updated = Boolean(updateResult.affected);

    return {
      updated,
    };
  }
}
