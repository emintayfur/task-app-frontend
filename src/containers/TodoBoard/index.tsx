import styles from '../../styles/for-containers/TodoBoard.module.css';
import ToDoItem from '../../components/ToDoItem';
import { ITodoBoardProps } from './types';
import Scrollbars from 'react-custom-scrollbars';

const TodoBoard = (props: ITodoBoardProps) => {
    const { board } = props;

    return (
        <div className={styles.container}>
            {/** Title */}
            <h1>
                {board?.prefixEmoji && (
                    <span role="img" aria-hidden="false">
                        {board.prefixEmoji}
                    </span>
                )}
                {board.name}
            </h1>

            {/** ToDoItem */}
            <Scrollbars autoHide autoHideDuration={100} universal>
                <div className={styles.list}>
                    <ToDoItem />
                    <ToDoItem />
                    <ToDoItem />
                    <ToDoItem />
                    <ToDoItem />
                    <ToDoItem />
                </div>
            </Scrollbars>
        </div>
    );
};

export default TodoBoard;
