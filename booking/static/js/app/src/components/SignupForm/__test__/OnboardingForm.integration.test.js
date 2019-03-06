import React from 'react';
import { mount } from 'enzyme';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import OnboardingForm from '../OnboardingForm';
import theme from '../../../theme';
import configureStore from '../../../store';

import Button from '../../form/RaisedButton';
import TextField from '../TextField';

jest.mock('../../../request/requests');

import {
  updateUserBio,
  getGenres,
} from '../../../request/requests';

const results = [
  'one',
  'two'
];

updateUserBio.mockReturnValue(Promise.resolve()),
getGenres.mockReturnValue(Promise.resolve({
  data: {
    results,
  }
}));

describe('OnboardingForm', () => {
  let store = null;
	let onSave = null;
	let subject = null;

  beforeEach(() => {
      jest.resetModules();
    	store = configureStore()

      // TODO pull provider and theme provider into a utility
      subject = mount(
        <Provider store={store}>
          <MuiThemeProvider
            theme={theme}
          >
            <OnboardingForm />
          </MuiThemeProvider>
        </Provider>
      )
  });

  it('loads genres on component mount', () => {
    expect(getGenres).toHaveBeenCalled();
  });
});
