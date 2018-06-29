import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    position: 'relative',
    top: '-15px',
  },
});

const AdjustButton = (props) => {
    const {
        classes,
        children
    } = props;

    return React.Children.map(children, child => {
      return React.cloneElement(child, { className: classes.button })
    })
}

export default withStyles(styles)(AdjustButton);