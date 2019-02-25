import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import React, { Fragment } from 'react';

class TextFieldWithReduxForm extends React.Component {
  render(props) {
    const {
      input,
      errorClassName,
      meta: {
        touched,
        error
      },
      helpText,
      ...rest
    } = this.props;

    return (
      <Fragment>
        <TextField {...input} {...rest} />
        {
          Boolean(touched && error) &&
          <FormHelperText error={true} className={errorClassName || ''}>{error}</FormHelperText>
        }
        {
          !Boolean(touched && error) && helpText !== undefined &&
          <FormHelperText>{helpText}</FormHelperText>
        }
      </Fragment>
    )
  }
}

export default TextFieldWithReduxForm;
