import { createReducer } from '@reduxjs/toolkit';
import BoardId from '../../enums/BoardId';
import { setPriority } from '../actions/priority';

export default createReducer<BoardId>(BoardId.normal, (builder) => {
    // @ts-ignore
    return builder.addCase(setPriority, (state, action) => {
        return action.payload;
    });
});
