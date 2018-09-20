import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { createStore } from 'redux';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

const initialState = {};

const store = createStore(
  combineReducers({
    form
  }),
  initialState
);

const Provider = ({ story }) => (
  <MuiThemeProvider theme={theme}>
    <ReduxProvider store={store}>
      {story}
    </ReduxProvider>
  </MuiThemeProvider>
);

export {
  Provider
}