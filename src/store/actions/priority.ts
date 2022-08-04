import { createAction } from '@reduxjs/toolkit';
import { IPriorityData } from '../reducers/priority';

export const setSelectedPriority = createAction<string>(
    'SET_SELECTED_PRIORITY',
);

export const priorityDataIsLoading = createAction('PRIORITY_DATA_IS_LOADING');
export const priorityFetchFailed = createAction('PRIORITY_FETCH_FAILED');
export const setPriority = createAction<IPriorityData>('SET_PRIORITY');
