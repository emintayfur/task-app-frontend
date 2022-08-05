import { createReducer } from '@reduxjs/toolkit';
import {
    clearFilter,
    clearSearchQuery,
    clearShowedPriorities,
    setFilter,
    setSearchQuery,
    setShowedPriorities,
} from '../actions/filter';

export interface IFilterState {
    contains: string;
    priorities: string[];
    initialPriorities: string[];
}

export const INITIAL_FILTER_STATE: IFilterState = {
    contains: '',
    priorities: [],
    initialPriorities: [],
};

export const isInitialFilter = (filterState: IFilterState) => {
    if (filterState.contains !== INITIAL_FILTER_STATE.contains) return false;
    return comparePriorities(
        filterState?.priorities,
        filterState?.initialPriorities,
    );
};
export const comparePriorities = (a: string[], b: string[]) => {
    return JSON.stringify([...a]?.sort()) === JSON.stringify([...b]?.sort());
};
export const compareFilters = (filterState: IFilterState, b: any) => {
    const cloneFilterState = Object.assign({}, filterState);
    delete (cloneFilterState as any).initialPriorities;

    return JSON.stringify(cloneFilterState) === JSON.stringify(b);
};

export default createReducer<IFilterState>(INITIAL_FILTER_STATE, (builder) => {
    return (
        builder
            .addCase(setFilter, (state, action) => {
                state.contains = action.payload.contains;
                state.priorities = action.payload.priorities;
                if (action?.payload?.initialPriorities)
                    state.initialPriorities = action.payload.initialPriorities;
            })
            .addCase(clearFilter, (state) => {
                state.contains = INITIAL_FILTER_STATE.contains;
                state.priorities =
                    state.initialPriorities || INITIAL_FILTER_STATE.priorities;
                state.initialPriorities =
                    state.initialPriorities ||
                    INITIAL_FILTER_STATE.initialPriorities;
            })
            /** Search Query */
            .addCase(setSearchQuery, (state, action) => {
                state.contains = action.payload;
            })
            .addCase(clearSearchQuery, (state) => {
                state.contains = INITIAL_FILTER_STATE.contains;
            })
            /** Priorities */
            .addCase(setShowedPriorities, (state, action) => {
                state.priorities = action.payload;
                state.initialPriorities = action.payload;
            })
            .addCase(clearShowedPriorities, (state) => {
                state.priorities = INITIAL_FILTER_STATE.priorities;
            })
    );
});
