import React from 'react';
// import PropTypes from 'prop-types';

// TOOD add docs on redux form  and material ui
// https://redux-form.com/6.7.0/docs/api/form.md/
const ReduxFormFieldWrapper = WrappedComponent => ({
  input,
  label,
  meta: { touched, error },
  ...custom,
  onChange,
}) => {
  return (
        <WrappedComponent
          error={touched && error}
          touched={touched}
          onChange={onChange}
          {...input}
          {...custom}
          fullWidth
        />
    )
  }

export default ReduxFormFieldWrapper;