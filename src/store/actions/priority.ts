import { createAction } from '@reduxjs/toolkit';
import Board from '../../constants/board';

export const setPriority = createAction<keyof typeof Board>('SET_PRIORITY');
