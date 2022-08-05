import { createAction } from '@reduxjs/toolkit';
import { IOrderStateItem } from '../reducers/order';

export const setOrder = createAction<IOrderStateItem[]>('SET_ORDER');
export const clearOrder = createAction('CLEAR_ORDER');
