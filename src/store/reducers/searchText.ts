import { createReducer } from '@reduxjs/toolkit';
import { setSearchText } from '../actions/searchText';

export default createReducer<string>('', (builder) => {
    // @ts-ignore
    return builder.addCase(setSearchText, (state, action) => {
        return action.payload;
    });
});
