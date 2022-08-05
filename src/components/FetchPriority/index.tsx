import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPriority } from '../../service/priority';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    priorityDataIsLoading,
    priorityFetchFailed,
    setPriority,
} from '../../store/actions/priority';
import { setShowedPriorities } from '../../store/actions/filter';
import { IPriorityResponse } from '../../store/reducers/priority';

const FetchPriority = () => {
    const priority = useAppSelector((state) => state.priority);
    const dispatch = useAppDispatch();

    const getPriority = useQuery<IPriorityResponse>(
        fetchPriority.queryKey,
        fetchPriority,
        {
            refetchOnWindowFocus: false,
            enabled: !priority.is.fetched,
            onSuccess(res) {
                if (res?.success && res?.data) {
                    dispatch(setPriority(res?.data));
                    dispatch(
                        setShowedPriorities(
                            (res?.data?.list || []).map(
                                (priority) => priority.id,
                            ),
                        ),
                    );
                }
            },
        },
    );

    useEffect(() => {
        if (getPriority.isLoading) {
            dispatch(priorityDataIsLoading());
        } else if (getPriority.isError) {
            dispatch(priorityFetchFailed());
        }
    }, [dispatch, getPriority.isLoading, getPriority.isError]);

    return <></>;
};

export default FetchPriority;
