import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { Fragment } from 'react';

const toString = (value) => {
  if (value || typeof value === 'number') {
    return value.toString();
  }
  return String();
};

const RadioGroupWithReduxForm = ({
  input: { onChange, value, ...inputProps },
  meta: { touched, error },
  ...props
}) => (
  <Fragment>
    <RadioGroup
      {...inputProps}
      {...props}
      value={toString(value)}
      onChange={(event, isInputChecked) => {
        onChange(event, isInputChecked);
      }}
    />
    {touched
      && error && (
        <FormHelperText error="true">
          {error}
        </FormHelperText>
    )}
  </Fragment>
);

export default RadioGroupWithReduxForm;