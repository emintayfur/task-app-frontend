import { createReducer } from '@reduxjs/toolkit';
import { setDeletingTaskId } from '../actions/deletingTaskId';

export default createReducer<string>('', (builder) => {
    // @ts-ignore
    return builder.addCase(setDeletingTaskId, (state, action) => {
        return action.payload;
    });
});
