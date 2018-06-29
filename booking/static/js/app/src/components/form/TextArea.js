import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, withTheme, MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import ReduxFromField from '../HOComponents/ReduxFormField';


const styles = theme => ({
  textArea: {
    height: '30px',
  },
});

let TextArea = (props) => {
  const {
    classes
  } = props
  return (
        <TextField
            multiline
            fullWidth
            rows={4}
            {...props}
            className={classes.textArea}
        />
    )
  }

TextArea = withStyles(styles)(TextArea);

export default compose(ReduxFromField)(TextField);