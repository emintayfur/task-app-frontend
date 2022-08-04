import { createAction } from '@reduxjs/toolkit';
import { TaskElem } from '../reducers/tasks';

export const addTask = createAction<TaskElem>('ADD_TASK');
export const changeTaskPriority = createAction<{
    taskId: string;
    priorityId: string;
}>('CHANGE_TASK_PRIORITY');
export const deleteTask = createAction<TaskElem['id']>('DELETE_TASK');
