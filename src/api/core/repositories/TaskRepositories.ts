import { Repository, EntityRepository } from 'typeorm';

import { Task } from '@entities/Task';

@EntityRepository(Task)
class TaskRepositories extends Repository<Task> {}

export { TaskRepositories };
