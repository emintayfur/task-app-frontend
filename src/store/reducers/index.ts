import { combineReducers } from 'redux';
import tasks from './tasks';
import priority from './priority';
import deletingTaskId from './deletingTaskId';
import edit from './edit';
import searchText from './searchText';

const rootReducer = combineReducers({
    tasks,
    priority,
    deletingTaskId,
    edit,
    searchText,
});

export default rootReducer;
