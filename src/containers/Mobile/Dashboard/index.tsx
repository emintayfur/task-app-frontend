import styles from '../../../styles/dashboard/Mobile.module.css';
import React, { useMemo } from 'react';
import MobileHeader from '../Header';
import TaskItem from '../../../components/TaskItem';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import TaskListIsEmptyMessage from '../TaskListIsEmptyMessage';
import { useAppSelector } from '../../../store/hooks';
import { IDashboardMobileProps } from './types';
import Loader from '../../Loader';
import ErrorContainer from '../../ErrorContainer';

const DashboardMobile = (props: IDashboardMobileProps) => {
    const { tasks, totalItemCount } = props;
    const priorities = useAppSelector((state) => state.priority);
    const priorityObj = useAppSelector(
        (state) => state.priority.fetchedData.obj,
    );
    const [animateRef] = useAutoAnimate<any>();

    const itemCount = useMemo(() => {
        return tasks.length;
    }, [tasks]);

    return (
        <div className={styles.container}>
            {/** Mobile Header */}
            <MobileHeader
                itemCount={totalItemCount}
                filteredItemCount={itemCount}
            />

            <div className={styles.listContainer}>
                {/** Loader */}
                {priorities.is.loading && <Loader />}

                {/** Error Container */}
                {Boolean(!priorities.is.loading && !priorities.is.fetched) && (
                    <ErrorContainer />
                )}
            </div>

            {/** Task list is empty message */}
            {Boolean(totalItemCount) && <TaskListIsEmptyMessage />}

            {/** Task List */}
            {Boolean(itemCount) && (
                <div className={styles.body}>
                    <div className={styles.listContainer}>
                        <ul className={styles.list} ref={animateRef as any}>
                            {tasks.map((item) => (
                                <li key={`task_${item.id}`}>
                                    <TaskItem
                                        item={item}
                                        borderColor={
                                            priorityObj[item.priority]?.color
                                                ?.primary
                                        }
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/** List end dot (.) */}
            {Boolean(itemCount) && (
                <div className={styles.footer}>
                    <span>.</span>
                </div>
            )}
        </div>
    );
};

export default DashboardMobile;
