import { getCustomRepository } from 'typeorm';
import { BadRequest } from 'http-errors';

import { ProjectRepositories } from '@repositories/ProjectRepositories';
import { TagRepositories } from '@repositories/TagRepositories';

/**
 * @interface IProject
 */
export interface IProject {
  title: string;
  subtitle: string;
  description: string;
  tag_id: string;
}

/**
 * @class CreateProjectsServices
 */
export class CreateProjectService {
  public constructor(
    public repositories = getCustomRepository(ProjectRepositories),
    public tagRepositories = getCustomRepository(TagRepositories)
  ) {}

  /**
   * @method execute - main method
   */
  async execute(user_id: string, project: IProject) {
    const { title, subtitle, description, tag_id } = project;

    const tag = await this.tagRepositories.findOne({ id: tag_id });

    /** @TODO Return a error message, tag validation */
    if (!tag) throw new BadRequest('Invalid tag!');

    const projectInstance = this.repositories.create({
      title,
      subtitle,
      description,
      tag_id,
      owner_id: user_id,
    });

    const projectInstanceSaved = await this.repositories.save(projectInstance);

    return projectInstanceSaved;
  }
}
