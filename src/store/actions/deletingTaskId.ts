import { createAction } from '@reduxjs/toolkit';

export const setDeletingTaskId = createAction<string>('SET_DELETING_TASK_ID');
