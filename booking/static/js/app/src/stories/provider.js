import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { createStore } from 'redux';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const initialState = {};

const theme = createMuiTheme({
  palette: {
      primary: {
          light: "#7f9ca8",
          main: "#526e79",
          dark: "#27434d",
          contrastText: "#fff",
      },
      secondary: {
          light: "#53ecfd",
          main: "#00b9d1",
          dark: "#0089a0",
          contrastText: "#fff",
      }
  }
});

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