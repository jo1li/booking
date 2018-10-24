import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const noop = () => {};

class SelectField extends React.Component {
  render(props) {
    const { input, label, meta: { touched, error }, children, ...rest } = this.props
    return (
      <FormControl error={Boolean(touched && error)} fullWidth>
        {label && <InputLabel>{label}</InputLabel>}
        <Select
          {...input}
          onChange={event => input.onChange(event.target.value)}
          onBlur={noop} // https://github.com/erikras/redux-form/issues/2768
          value={input.value}
          {...rest}
        >
          {children}
        </Select>
        {touched && error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>     
    )
  }

}

export default SelectField;