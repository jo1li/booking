import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames'
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    // TODO: Do we want these button styles to be *everywhere*? bc now they are.
    borderRadius: '5px',
    height: '38px',
    border: `solid 1px ${theme.palette.primaryTonal[500]}`,
    borderColor: theme.palette.primaryTonal[500],
    outline: 'none',
    outlineColor: 'none',
    '&:disabled': {
        border: 0,
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
    disabled,
    variant,
    ...remainingProps
  } = props;

  return (
    <Button
      variant={variant || "outlined"}
      color="primary"
      type={type}
      onClick={onClick}
      disabled={disabled}

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
