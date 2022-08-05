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
        <div className="flex relative z-20 h-screen box-border flex-col justify-between items-center py-4 pt-10 gap-2">
            <div className="flex flex w-10/12 mx-auto h-full">
                <Scrollbars universal>
                    <div className="flex relative flex box-border h-full flex-1 pb-7 px-4">
                        <div className="flex relative flex-1 gap-8 z-20 justify-center items-center">
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
