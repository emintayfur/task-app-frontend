import type { GetStaticProps, NextPage } from 'next';
import AddTaskContainer from '../containers/AddTask';
import TaskBoard from '../containers/TaskBoard';
import Scrollbars from 'react-custom-scrollbars';
import BgLinearByPriority from '../components/BgLinearByPriority';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { TaskElem } from '../store/reducers/tasks';
import { setDeletingTaskId } from '../store/actions/deletingTaskId';
import EditTask from '../components/EditPriority';
import { prefetchGlobal } from '../service/prefetch';
import { dehydrate } from '@tanstack/query-core';
import { useQuery } from '@tanstack/react-query';
import { fetchPriority } from '../service/priority';
import FetchPriority from '../components/FetchPriority';
import { IPriority, IPriorityResponse } from '../store/reducers/priority';

const getTasksByPriority = (priority: IPriority, tasks: TaskElem[]) =>
    tasks.filter((task) => task.priority === priority.id);

const RiseTechQDashboard: NextPage = () => {
    const state = useAppSelector((state) => state);
    const dispatch = useAppDispatch();

    const tasksState = useAppSelector((state) => state.tasks);
    const tasks = useMemo(() => {
        let tasksClone = Array.from(tasksState);

        if (state.searchText) {
            tasksClone = tasksClone.filter((task) =>
                Boolean(
                    task.text.search(state.searchText) !== -1 ||
                        task.text
                            .toLowerCase()
                            .search(state.searchText.toLowerCase()) !== -1,
                ),
            );
        }

        return tasksClone.sort((prev, current) => {
            /** Alfabetik */
            const prevTaskText = prev.text.toLowerCase();
            const currentTaskText = current.text.toLowerCase();
            const alphabetic =
                prevTaskText < currentTaskText
                    ? -1
                    : prevTaskText > currentTaskText
                    ? 1
                    : 0;

            return alphabetic;
        });
    }, [tasksState, state.searchText]);

    const getPriority = useQuery<IPriorityResponse>(
        fetchPriority.queryKey,
        fetchPriority,
        {
            refetchOnWindowFocus: false,
            placeholderData: {
                success: true,
                data: {
                    list: [],
                    obj: {},
                },
                errors: [],
            },
            staleTime: 1000 * 60 * 5,
        },
    );

    const priorityList = useMemo<IPriority[]>(() => {
        if (
            getPriority.isSuccess &&
            getPriority.data?.data &&
            Array.isArray(getPriority.data?.data?.list)
        )
            return getPriority.data?.data?.list;

        return [];
    }, [getPriority.isSuccess, getPriority.data]);

    useEffect(() => {
        let timer: null | NodeJS.Timer = null;

        if (state.deletingTaskId) {
            timer = setTimeout(() => {
                dispatch(setDeletingTaskId(''));
            }, 3000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [state.deletingTaskId, dispatch]);

    return (
        <>
            <FetchPriority />
            <BgLinearByPriority />
            <EditTask />

            <div className="flex relative z-20 h-screen box-border flex-col justify-between items-center py-4 pt-10 gap-2">
                <div className="flex flex w-10/12 mx-auto h-full">
                    <Scrollbars universal>
                        <div className="flex relative flex box-border h-full flex-1 pb-7 px-4">
                            <div className="flex relative flex-1 gap-8 z-20 justify-center items-center">
                                {priorityList.map((priority) => (
                                    <TaskBoard
                                        priority={priority}
                                        key={`board_${priority.id}`}
                                        items={getTasksByPriority(
                                            priority,
                                            tasks,
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </Scrollbars>
                </div>

                <AddTaskContainer />
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const dehydratedState = dehydrate(await prefetchGlobal());
    return { props: { dehydratedState } };
};

export default RiseTechQDashboard;
