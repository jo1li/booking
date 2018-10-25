import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import React, { Fragment } from 'react';

class TextFieldWithReduxForm extends React.Component {
  render(props) {
    const {
      input,
      meta: {
        touched,
        error
      },
      ...rest
    } = this.props
    return (
      <Fragment>
        <TextField {...input} {...rest} />
        {Boolean(touched && error) && <FormHelperText error="true">{error}</FormHelperText>}
      </Fragment>
    )
  }
}

export default TextFieldWithReduxForm;