import { createReducer } from '@reduxjs/toolkit';
import { addTask, changeTaskPriority, deleteTask } from '../actions/tasks';

export interface TaskElem {
    id: string;
    priority: string;
    text: string;
    createdAt: string;
}

export default createReducer<TaskElem[]>([], (builder) => {
    builder
        .addCase(addTask, (state, action) => {
            state.push(action.payload);
        })
        .addCase(deleteTask, (state, action) => {
            return state.filter((task) => task.id !== action.payload);
        })
        .addCase(changeTaskPriority, (state, action) => {
            const taskIdx = state.findIndex(
                (task) => task.id === action.payload.taskId,
            );

            const taskClone = Object.assign({}, state[taskIdx]);
            taskClone.priority = action.payload.priorityId;

            state[taskIdx] = taskClone;
        });
});
