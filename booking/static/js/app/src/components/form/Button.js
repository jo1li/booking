import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames'
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    borderRadius: '22px',
    height: '44px',
    border: `solid 1px ${theme.palette.secondary.main}`,
    borderColor: theme.palette.secondary.main,
    outline: 'none',
    outlineColor: 'none',
    '&:disabled': {
        opacity: '0.2',
        color: theme.palette.secondary.main,
    }
  },
});

function ContainedButtons(props) {
  const {
    classes,
    children,
    onClick,
    type,
    className,
    ...remainingProps
  } = props;

  return (
    <Button
      variant="outlined"
      color="secondary"
      type={type}
      onClick={onClick}

      // for some reason outline will not go away unless its an inline style
      style={{outline: 'none'}}
      {...remainingProps}
      className={classNames(classes.button, className)}
    >

        { children }

    </Button>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButtons);
