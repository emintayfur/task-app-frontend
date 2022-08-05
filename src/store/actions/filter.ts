import { createAction } from '@reduxjs/toolkit';
import { IFilterState } from '../reducers/filter';

export const setFilter = createAction<
    Omit<IFilterState, 'initialPriorities'> & {
        initialPriorities?: IFilterState['initialPriorities'];
    }
>('SET_FILTER');
export const clearFilter = createAction('CLEAR_FILTER');

export const setSearchQuery =
    createAction<IFilterState['contains']>('SET_SEARCH_QUERY');
export const clearSearchQuery = createAction('CLEAR_SEARCH_QUERY');

export const setShowedPriorities = createAction<IFilterState['priorities']>(
    'SET_SHOWED_PRIORITIES',
);
export const clearShowedPriorities = createAction('CLEAR_SHOWED_PRIORITIES');
