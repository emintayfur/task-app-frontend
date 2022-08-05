import { combineReducers } from 'redux';
import tasks from './tasks';
import priority from './priority';
import deletingTaskId from './deletingTaskId';
import edit from './edit';
import filter from './filter';
import order from './order';

const rootReducer = combineReducers({
    tasks,
    priority,
    deletingTaskId,
    edit,
    filter,
    order,
});

export default rootReducer;
