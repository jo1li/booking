import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from 'react-select';

const noop = () => {};

class MultiSelect extends React.Component {
  render(props) {
    const { input, label, helpText, meta: { touched, error }, children, ...rest } = this.props
    return (
      <FormControl error={Boolean(touched && error)} fullWidth>
        {label && <InputLabel>{label}</InputLabel>}
        <Select
          {...input}
          // onChange={event => input.onChange(event.target.value)}
          onBlur={noop} // https://github.com/erikras/redux-form/issues/2768
          {...rest}
        >
          {children}
        </Select>
        <FormHelperText>{helpText}</FormHelperText>
        {Boolean(touched && error) && <FormHelperText error={true}>{error}</FormHelperText>}
      </FormControl>
    )
  }

}

export default MultiSelect;