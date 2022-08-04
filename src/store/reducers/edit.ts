import { createReducer } from '@reduxjs/toolkit';
import { clearEdit, setEdit } from '../actions/edit';

export interface IEditState {
    width: number;
    top: number;
    left: number;
    currentPriority: string | null;
    id: null | string;
}

const initialState: IEditState = {
    width: 0,
    top: 0,
    left: 0,
    currentPriority: null,
    id: null,
};

export default createReducer<IEditState>(initialState, (builder) => {
    // @ts-ignore
    return builder
        .addCase(setEdit, (state, action) => {
            return action.payload;
        })
        .addCase(clearEdit, () => {
            return initialState;
        });
});
