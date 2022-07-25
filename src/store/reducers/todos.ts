import { createReducer } from '@reduxjs/toolkit';
import Board from '../../constants/board';
import { addTodo } from '../actions/todos';

export interface TodoElem {
    board: keyof typeof Board;
    text: string;
    createdAt: string;
}

export default createReducer<TodoElem[]>([], (builder) => {
    builder.addCase(addTodo, (state, action) => {
        state.push(action.payload);
    });
});
