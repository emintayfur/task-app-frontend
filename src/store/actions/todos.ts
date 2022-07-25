import { createAction } from '@reduxjs/toolkit';
import { TodoElem } from '../reducers/todos';

export const addTodo = createAction<TodoElem>('ADD_TODO');
