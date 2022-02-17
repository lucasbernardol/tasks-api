import { EntityRepository, Repository } from 'typeorm';

import { Project } from '@entities/Project';

@EntityRepository(Project)
class ProjectRepositories extends Repository<Project> {}

export { ProjectRepositories };
