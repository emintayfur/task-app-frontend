import { createAction } from '@reduxjs/toolkit';
import { IEditState } from '../reducers/edit';

export const setEdit = createAction<IEditState>('SET_EDITING_TASK');
export const clearEdit = createAction('CLEAR_EDITING_TASK');
