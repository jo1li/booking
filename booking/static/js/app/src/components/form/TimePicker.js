import React from 'react';
import { compose } from 'redux';
import classNames from 'classnames'
import { TimePicker } from 'material-ui-pickers';
import ReduxFromField from '../HOComponents/ReduxFormField';

const TimePickerInternal = (props) => {
  const {
    className,
    value,
  } = props;

  // TimePicker specifically needs `value` to be `null` in order to show the
  // "empty label", but redux form uses an empty string by default.
  return (
    <TimePicker
      {...props}
      value={value || null}
      className={classNames(className)} />
  )
}


export default compose(
  ReduxFromField,
)(TimePickerInternal);
