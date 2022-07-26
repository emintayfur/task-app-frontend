import styles from '../../styles/for-containers/TodoBoard.module.css';
import ToDoItem from '../../components/ToDoItem';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ITodoBoardProps } from './types';
import Scrollbars from 'react-custom-scrollbars';

const TodoBoard = (props: ITodoBoardProps) => {
    const { board, items } = props;
    const [animatedBoardListRef] = useAutoAnimate();

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
                <div className={styles.list} ref={animatedBoardListRef as any}>
                    {items.map((item) => (
                        <ToDoItem
                            item={item}
                            key={`${board.id}_todo_${item.id}`}
                        />
                    ))}
                </div>
            </Scrollbars>
        </div>
    );
};

export default TodoBoard;
