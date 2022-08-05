import React, { useMemo } from 'react';
import MobileHeader from '../Header';
import TaskItem from '../../../components/TaskItem';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import TaskListIsEmptyMessage from '../TaskListIsEmptyMessage';
import { useAppSelector } from '../../../store/hooks';
import { IDashboardMobileProps } from './types';

const DashboardMobile = (props: IDashboardMobileProps) => {
    const { tasks, totalItemCount } = props;
    const priorityObj = useAppSelector(
        (state) => state.priority.fetchedData.obj,
    );
    const [animateRef] = useAutoAnimate<any>();

    const itemCount = useMemo(() => {
        return tasks.length;
    }, [tasks]);

    return (
        <div>
            <div className="flex flex-col w-full items-center relative z-20 flex-col gap-6 box-border pb-5">
                {/** Mobile Header */}
                <MobileHeader
                    itemCount={totalItemCount}
                    filteredItemCount={itemCount}
                />

                {/** Task list is empty message */}
                {!Boolean(totalItemCount) && <TaskListIsEmptyMessage />}

                {/** Task List */}
                {Boolean(itemCount) && (
                    <div className="flex justify-center items-center w-full">
                        <div className=" w-11/12">
                            <ul
                                className="flex flex-col gap-4"
                                ref={animateRef as any}
                            >
                                {tasks.map((item) => (
                                    <li key={`task_${item.id}`}>
                                        <TaskItem
                                            item={item}
                                            borderColor={
                                                priorityObj[item.priority]
                                                    ?.color?.primary
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
                    <div className="py-3 font-inter text-grey-400 font-semibold text-3xl opacity-40">
                        <span>.</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardMobile;
