import styles from '../../styles/for-components/TaskItem.module.css';
import TrashIcon from '../../assets/svg/icons/trash.svg';
import { ITodoItem } from './types';
import dayjs from 'dayjs';
import { APP_DATETIME_FORMAT } from '../../constants/dayjs';

const ToDoItem = (props: ITodoItem) => {
    const {
        item: { text, createdAt },
    } = props;

    return (
        <div className={styles.container}>
            {/** Header */}
            <div className={styles.header}>
                <div className={styles.date}>
                    <span>{dayjs(createdAt).format(APP_DATETIME_FORMAT)}</span>
                </div>

                <button type="button" onClick={() => {}}>
                    <TrashIcon viewBox="0 0 64 64" width={20} height={20} />
                </button>
            </div>

            {/** content */}
            <div className={styles.content}>{text}</div>
        </div>
    );
};

export default ToDoItem;
