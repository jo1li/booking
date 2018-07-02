import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme, MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';


// TOOD add docs on redux form  and material ui
// https://redux-form.com/6.7.0/docs/api/form.md/
const ReduxFormFieldWrapper = WrappedComponent => ({
  input,
  label,
  meta: { touched, error },
  ...custom,
  onChange,
}) => {
  return (
        <WrappedComponent

          errorText={touched && error}
          onChange={onChange}
          {...input}
          {...custom}
          fullWidth
        />
    )
  }

export default ReduxFormFieldWrapper;