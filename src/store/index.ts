import { configureStore } from '@reduxjs/toolkit';
import todos from './reducers/todos';
import priority from './reducers/priority';

const store = configureStore({
    reducer: {
        todos,
        priority,
    },
    devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
