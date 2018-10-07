import React from 'react';
import { compose } from 'redux';
import classNames from 'classnames'
import { DatePicker } from 'material-ui-pickers';
import ReduxFromField from '../HOComponents/ReduxFormField';

const DatePickerInternal = (props) => {
  const {
    className,
    value,
  } = props;

  // TimePicker specifically needs `value` to be `null` in order to show the
  // "empty label", but redux form uses an empty string by default.
  return (
    <DatePicker
      keyboard
      clearable
      disableOpenOnEnter
      animateYearScrolling={false}
      format="MM/dd/YYYY"
      onChange={this.handleChange}
      mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
      {...props}
      value={value || null}
      className={classNames(className)} />
  )
}


export default compose(
  ReduxFromField,
)(DatePickerInternal);
