import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    borderRadius: '22px',
    border: 'solid 1px #00b9d1',
    minWidth: '137px',
  },
});

function ContainedButtons(props) {
  const {
    classes,
    children,
    onClick,
    type,
  } = props;

  return (
    <Button
      variant="outlined"
      color="secondary"
      type={type}
      className={classes.button}
      onClick={onClick}
      {...props}
    >
        { children }
    </Button>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButtons);