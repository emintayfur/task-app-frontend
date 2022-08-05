import { IPriority } from '../store/reducers/priority';
import { TaskElem } from '../store/reducers/tasks';

export const getTasksByPriority = (priority: IPriority, tasks: TaskElem[]) =>
    tasks.filter((task) => task.priority === priority.id);
