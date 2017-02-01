import { combineReducers } from 'redux';
import logins from './loginReducer';
import categories from './categoryReducer';

const rootReducer = combineReducers({
  logins,
  categories
});

export default rootReducer;
