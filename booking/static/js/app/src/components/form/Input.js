import React from 'react';
// import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import ReduxFormField from '../HOComponents/ReduxFormField';

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
    const {
        classes,
    } = props;

    return <Input
        classes={classes}
        {...props}
    />
}

export default compose(
    ReduxFormField,
    withStyles(styles)
)(InputInternal);
