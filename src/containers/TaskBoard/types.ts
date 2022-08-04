import type { TaskElem } from '../../store/reducers/tasks';
import { IPriority } from '../../types/priority';

export interface ITaskBoardProps {
    priority: IPriority;
    items: TaskElem[];
}
