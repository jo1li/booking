import React from 'react';
// import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Caption } from '../typography';

const styles = theme => ({
  countContainer: {
    position: 'relative',
  },
  count: {
      position: 'absolute',
      top: 0,
      right: 0,
      transform: 'translateY(-100%)'
  }
});

let TextCount = (props) => {
  const {
    classes,
    maxLength,
    currentLength,
    children,
  } = props;

  return (
        <div className={classes.countContainer}>
            <div className={classes.count}>
                <Caption>{`${currentLength} / ${maxLength}`}</Caption>
            </div>
            {children}
        </div>
    )
  }


export default compose(
   withStyles(styles)
)(TextCount);