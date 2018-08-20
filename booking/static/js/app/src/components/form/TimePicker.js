import React from 'react';
// import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import classNames from 'classnames'
import { TimePicker } from 'material-ui-pickers';
import ReduxFromField from '../HOComponents/ReduxFormField';

const styles = theme => ({});

let DatePickerInternal = (props) => {
  const {
    classes,
    className,
  } = props;

  return (
        <TimePicker
            showTodayButton
            todayLabel="now"
            {...props}
            className={classNames(className)}
        />
    )
  }


export default compose(
  ReduxFromField,
//    withStyles(styles)
)(DatePickerInternal);