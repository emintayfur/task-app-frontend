import { createAction } from '@reduxjs/toolkit';

export const setSearchText = createAction<string>('SET_SEARCH_TEXT');
