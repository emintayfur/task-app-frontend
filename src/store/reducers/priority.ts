import { createReducer } from '@reduxjs/toolkit';
import {
    priorityDataIsLoading,
    priorityFetchFailed,
    setPriority,
    setSelectedPriority,
} from '../actions/priority';

export interface IPriority {
    id: string;
    name: string;
    linearClassName?: string;
    prefixEmoji?: string;
    color?: {
        primary: string;
        secondary: string;
    };
    faviconPath?: {
        svg: string;
        png: string;
    };
    level: number;
}
export interface IPriorityData {
    list: IPriority[];
    obj: { [key: string]: IPriority };
}
export interface IPriorityResponse {
    success: boolean;
    data: IPriorityData | null;
    errors: any[];
}

export interface IPriorityState {
    selectedPriority: string | null;
    is: {
        fetched: boolean;
        loading: boolean;
    };
    fetchedData: IPriorityData;
}

const initialState: IPriorityState = {
    selectedPriority: null,
    is: {
        fetched: false,
        loading: true,
    },
    fetchedData: {
        list: [],
        obj: {},
    },
};

export default createReducer<IPriorityState>(initialState, (builder) => {
    return builder
        .addCase(setSelectedPriority, (state, action) => {
            state.selectedPriority = action.payload;
        })
        .addCase(priorityDataIsLoading, (state) => {
            state.is.loading = true;
            state.is.fetched = false;
        })
        .addCase(priorityFetchFailed, (state) => {
            state.is.loading = false;
            state.is.fetched = false;
        })
        .addCase(setPriority, (state, action) => {
            state.fetchedData = action.payload;
            state.is.fetched = true;
            state.is.loading = false;

            if (
                !state.selectedPriority &&
                Array.isArray(action.payload?.list) &&
                action.payload?.list[0]
            ) {
                state.selectedPriority = action.payload?.list[0]?.id || null;
            }
        });
});
