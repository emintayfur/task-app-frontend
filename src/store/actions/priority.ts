import { createAction } from '@reduxjs/toolkit';
import { IBoard } from '../../constants/board';

export const setPriority = createAction<IBoard['id']>('SET_PRIORITY');
