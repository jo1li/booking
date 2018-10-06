import React from 'react';
import { compose } from 'redux';
import classNames from 'classnames'
import { TimePicker } from 'material-ui-pickers';
import ReduxFromField from '../HOComponents/ReduxFormField';

const DatePickerInternal = (props) => {
  const {
    className,
  } = props;

  return (
    <TimePicker
        showTodayButton
        todayLabel="now"
        {...props}
        className={classNames(className)} />
  )
}


export default compose(
  ReduxFromField,
)(DatePickerInternal);
