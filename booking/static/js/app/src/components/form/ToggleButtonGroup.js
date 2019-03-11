import React, { Component } from 'react';
import classNames from 'classnames';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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
              onClick={() => this.setState({value: option.value})}
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
