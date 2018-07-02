import React from 'react';
// import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import ReduxFromField from '../HOComponents/ReduxFormField';

const styles = theme => ({
  textArea: {
    height: '100px',
    border: `2px solid ${theme.palette.grey[200]}`,
    padding: theme.spacing.unit,
  },
 underline: {
    '&:after': {
        borderBottom: `0px`,
    },
    '&:before': {
        borderBottom: `0px`,
    },
    '&:hover:not($disabled):not($focused):not($error):before': {
        borderBottom: `0px`,
    }
  },
  input: {
    height: '100%',
  }
});

let TextArea = (props) => {
  const {
    classes,
  } = props;

  return (
        <Input
            multiline
            fullWidth
            {...props}
            rows={10}
            type="textArea"
            classes={{
              underline: classes.underline,
              input: classes.input
            }}
            className={classes.textArea}
        />
    )
  }


export default compose(
  ReduxFromField,
   withStyles(styles)
)(TextArea);