import React from 'react';
// import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  countContainer: {
    position: 'relative',
  },
  count: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translateY(-100%)'
  },
  bold: {
    fontWeight: 'bold',
    color: 'red',
  }
});

let TextCount = (props) => {
  const {
    classes,
    className,
    maxLength,
    currentLength,
    children,
    inline,
  } = props;

  const isTooLong = currentLength > maxLength;

  return (
        <div className={classes.countContaine}>
            <div className={inline ? '' : classes.count}>
                <Typography variant="caption" className={className}>
                    <span className={isTooLong ? classes.bold : ''}>{currentLength}</span>
                    {`/${maxLength}`}
                </Typography>
            </div>
            {children}
        </div>
    )
  }


export default compose(
   withStyles(styles)
)(TextCount);
