import styles from '../../styles/for-containers/TaskBoard.module.css';
import TaskItem from '../../components/TaskItem';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ITaskBoardProps } from './types';
import Scrollbars from 'react-custom-scrollbars';
import { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';

const TaskBoard = (props: ITaskBoardProps) => {
    const { priority, items } = props;
    const searchQuery = useAppSelector((state) => state.filter.contains);

    const showLength = useMemo(() => {
        return Boolean(searchQuery && searchQuery.length);
    }, [searchQuery]);

    const [animateRef] = useAutoAnimate<any>();

    return (
        <div className={styles.container}>
            {/** Title */}
            <h1 ref={animateRef}>
                {priority?.prefixEmoji && (
                    <span role="img" aria-hidden="false">
                        {priority.prefixEmoji}
                    </span>
                )}
                {priority.name}
                {showLength && (
                    <span className={styles.muted}>({items.length})</span>
                )}
            </h1>

            {/** TaskItem */}
            <Scrollbars autoHide autoHideDuration={100} universal>
                <ul className={styles.list} ref={animateRef as any}>
                    {items.map((item) => (
                        <li key={`${priority.id}_task_${item.id}`}>
                            <TaskItem item={item} />
                        </li>
                    ))}
                </ul>
            </Scrollbars>
        </div>
    );
};

export default TaskBoard;
