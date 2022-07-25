import styles from '../../styles/for-components/TaskItem.module.css';
import TrashIcon from '../../assets/svg/icons/trash.svg';

const ToDoItem = () => {
    return (
        <div className={styles.container}>
            {/** Header */}
            <div className={styles.header}>
                <div className={styles.date}>
                    <span>25 Temmuz 2022 15:80</span>
                </div>

                <button type="button" onClick={() => {}}>
                    <TrashIcon viewBox="0 0 64 64" width={20} height={20} />
                </button>
            </div>

            {/** content */}
            <div className={styles.content}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore, tempor incididunt ut labore ut consectetur adipiscing
            </div>
        </div>
    );
};

export default ToDoItem;
