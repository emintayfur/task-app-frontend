import type { TaskElem } from '../../store/reducers/tasks';
import { IPriority } from '../../store/reducers/priority';

export interface ITaskBoardProps {
    priority: IPriority;
    items: TaskElem[];
}
