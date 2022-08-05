import styles from '../../styles/dashboard/Desktop.module.css';
import React, { useMemo } from 'react';
import TaskBoard from '../TaskBoard';
import AddTaskContainer from '../AddTask';
import Scrollbars from 'react-custom-scrollbars';
import { useAppSelector } from '../../store/hooks';
import { IPriority } from '../../store/reducers/priority';
import { getTasksByPriority } from '../../utils/task';
import { IDashboardDesktopProps } from './types';

const DashboardDesktop = (props: IDashboardDesktopProps) => {
    const { tasks } = props;
    const priorities = useAppSelector((state) => state.priority);

    const priorityList = useMemo<IPriority[]>(() => {
        if (
            priorities.is.fetched &&
            priorities.fetchedData.list &&
            Array.isArray(priorities.fetchedData.list)
        )
            return priorities.fetchedData.list;

        return [];
    }, [priorities.is.fetched, priorities.fetchedData.list]);

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <Scrollbars universal>
                    <div className={styles.boardsContainerParent}>
                        <div className={styles.boardsContainer}>
                            {priorityList.map((priority) => (
                                <TaskBoard
                                    priority={priority}
                                    key={`board_${priority.id}`}
                                    items={getTasksByPriority(priority, tasks)}
                                />
                            ))}
                        </div>
                    </div>
                </Scrollbars>
            </div>

            <AddTaskContainer />
        </div>
    );
};

export default DashboardDesktop;
