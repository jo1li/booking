import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme, MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';

const styles = theme => ({
  input: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const TextFieldInternal = (props) => {
  return (
      <MuiThemeProvider theme={theme}>
        <Input

        />
      </MuiThemeProvider>
    )
  }

export default TextFieldInternal;