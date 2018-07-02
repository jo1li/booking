import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, withTheme, MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import Input from '@material-ui/core/Input';
import { createMuiTheme } from '@material-ui/core/styles';
import ReduxFromField from '../HOComponents/ReduxFormField';

const styles = theme => ({
    underline: {
      '&:after': {
          borderBottom: `2px solid ${theme.palette.secondary.dark}`,
      },
      '&:before': {
          borderBottom: `2px solid ${theme.palette.grey[200]}`,
      },
    }
});

const InputInternal = (props) => {
    return <Input
        classes={classes}
        {...props}
    />
}

export default compose(
    ReduxFromField,
    withStyles(styles)
)(Input);