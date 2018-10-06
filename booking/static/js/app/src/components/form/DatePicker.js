import React from 'react';
import { compose } from 'redux';
import classNames from 'classnames'
import { DatePicker } from 'material-ui-pickers';
import ReduxFromField from '../HOComponents/ReduxFormField';

const DatePickerInternal = (props) => {
  const {
    className,
  } = props;

  return (
    <DatePicker
      keyboard
      clearable
      disableOpenOnEnter
      animateYearScrolling={false}
      format="DD/MM/YYYY"
      mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
      {...props}
      className={classNames(className)} />
  )
}


export default compose(
  ReduxFromField,
)(DatePickerInternal);
