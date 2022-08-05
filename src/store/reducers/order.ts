import { createReducer } from '@reduxjs/toolkit';
import { clearOrder, setOrder } from '../actions/order';

export interface IOrderStateItem {
    key: 'priority' | 'text';
    value: -1 | 0 | 1;
}

export const INITIAL_ORDER_STATE: IOrderStateItem[] = [
    {
        key: 'priority',
        value: 1,
    },
    {
        key: 'text',
        value: -1,
    },
];

export default createReducer<IOrderStateItem[]>(
    INITIAL_ORDER_STATE,
    (builder) => {
        return builder
            .addCase(setOrder, (state, action) => {
                return action.payload;
            })
            .addCase(clearOrder, () => {
                return INITIAL_ORDER_STATE;
            });
    },
);
