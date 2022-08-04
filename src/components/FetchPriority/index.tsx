import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPriority } from '../../service/priority';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    priorityDataIsLoading,
    priorityFetchFailed,
    setPriority,
} from '../../store/actions/priority';

const FetchPriority = () => {
    const priority = useAppSelector((state) => state.priority);
    const dispatch = useAppDispatch();

    const getPriority = useQuery(fetchPriority.queryKey, fetchPriority, {
        refetchOnWindowFocus: false,
        enabled: !priority.is.fetched,
        onSuccess(res) {
            if (res?.success) {
                dispatch(setPriority(res?.data));
            }
        },
    });

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
