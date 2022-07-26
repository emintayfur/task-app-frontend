import { combineReducers } from 'redux';
import todos from './todos';
import priority from './priority';

const rootReducer = combineReducers({
    todos,
    priority,
});

export default rootReducer;
