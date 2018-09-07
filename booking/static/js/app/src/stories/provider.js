import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { createStore } from 'redux';

const initialState = {};

const store = createStore(
  combineReducers({
    form
  }),
  initialState
);

const Provider = ({ story }) => (
  <ReduxProvider store={store}>
    {story}
  </ReduxProvider>
);

export {
  Provider
}