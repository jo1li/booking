import React, { Component } from 'react';
import classNames from 'classnames';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

// NB: Toggles are part of material-ui lab, so can behave kind of funky,
// had to be supplemented here.
class OpusToggleButtonGroup extends Component {
  state = { value: 'individual'}

  render() {
    const { input, options, classes, ...rest } = this.props;

    return <ToggleButtonGroup
        {...input}
        value={this.state.value}
        className={classes.toggleButtonGroup}
        {...rest}>
      {
        options.map((option, idx) => (
          <ToggleButton
              key={idx}
              disableRipple
              value={option.value}
              onClick={() => {
                this.setState({value: option.value});
                input.onChange(option.value); // Doesn't trigger automatically
              }}
              className={classNames(
                option.value === this.state.value ? classes.selectedToggleButton : '',
                classes.toggleButton,
              )}>
            {option.label}
          </ToggleButton>
        ))
      }
    </ToggleButtonGroup>;
  }
}

export default OpusToggleButtonGroup;
