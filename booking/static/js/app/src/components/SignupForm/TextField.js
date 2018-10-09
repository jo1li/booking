import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import React, { Fragment } from 'react';

const TextFieldWithReduxForm = ({ input, meta: { touched, error }, ...props }) => {
  const hasError = Boolean(touched && error);
  return (
    <Fragment>
      <TextField error={hasError} {...input} {...props} />
      {hasError && (
        <FormHelperText dangerouslySetInnerHTML={{ __html: error }} className="error" error />
      )}
    </Fragment>
  );
};

export default TextFieldWithReduxForm;