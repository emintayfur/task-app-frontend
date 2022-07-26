import { IBoard } from '../../constants/board';
import { TodoElem } from '../../store/reducers/todos';

export interface ITodoBoardProps {
    board: IBoard;
    items: TodoElem[];
}
