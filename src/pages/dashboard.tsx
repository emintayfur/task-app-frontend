import type { GetStaticProps, NextPage } from 'next';
import BgLinearByPriority from '../components/BgLinearByPriority';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setDeletingTaskId } from '../store/actions/deletingTaskId';
import EditTask from '../components/EditPriority';
import { prefetchGlobal } from '../service/prefetch';
import { dehydrate } from '@tanstack/query-core';
import FetchPriority from '../components/FetchPriority';
import useMobileViewController from '../hooks/useMobileViewController';
import DashboardMobile from '../containers/Dashboard/Mobile';
import DashboardDesktop from '../containers/Dashboard/Desktop';
import { IDashboardGlobalProps } from '../containers/Dashboard/types';

const RiseTechQDashboard: NextPage = () => {
    const state = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const tasksState = useAppSelector((state) => state.tasks);
    const isMobile = useMobileViewController();

    const tasks = useMemo(() => {
        let tasksClone = Array.from(tasksState).filter((task) =>
            state.filter.priorities.includes(task.priority),
        );

        if (state.filter.contains) {
            tasksClone = tasksClone.filter((task) =>
                Boolean(
                    task.text.search(state.filter?.contains || '') !== -1 ||
                        task.text
                            .toLowerCase()
                            .search(
                                (state.filter?.contains || '').toLowerCase(),
                            ) !== -1,
                ),
            );
        }

        return tasksClone.sort((first, second) => {
            return [...state.order]
                .reverse()
                .reduce((previousOrder, currentValue) => {
                    const firstItemWithKey = first[currentValue.key];
                    const secondItemWithKey = second[currentValue.key];

                    let returnedValue = 0;

                    switch (currentValue.key) {
                        case 'priority': {
                            const firstItemLevel =
                                state.priority.fetchedData.obj[firstItemWithKey]
                                    ?.level || 0;
                            const secondItemLevel =
                                state.priority.fetchedData.obj[
                                    secondItemWithKey
                                ]?.level || 0;

                            returnedValue = secondItemLevel - firstItemLevel;
                            break;
                        }
                        case 'text': {
                            returnedValue =
                                secondItemWithKey.localeCompare(
                                    firstItemWithKey,
                                );
                            break;
                        }
                    }

                    returnedValue = returnedValue * currentValue.value;

                    return returnedValue || previousOrder;
                }, 0);
        });
    }, [tasksState, state.filter, state.priority.fetchedData.obj, state.order]);

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

    const dashboardGlobalProps = useMemo<IDashboardGlobalProps>(
        () => ({
            tasks,
            totalItemCount: tasksState.length,
        }),
        [tasks, tasksState],
    );

    return (
        <>
            <FetchPriority />
            <BgLinearByPriority isMobile={isMobile} />
            <EditTask />

            {isMobile && <DashboardMobile {...dashboardGlobalProps} />}
            {!isMobile && <DashboardDesktop {...dashboardGlobalProps} />}
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const dehydratedState = dehydrate(await prefetchGlobal());
    return { props: { dehydratedState } };
};

export default RiseTechQDashboard;
