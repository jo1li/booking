import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import example from './example';
export default combineReducers({
  example,
  form,
});
