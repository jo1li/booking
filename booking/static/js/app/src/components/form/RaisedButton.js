import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  //TODO share these styles
  button: {
    margin: theme.spacing.unit,
    borderRadius: '22px',
    minWidth: '137px',
  },
});

function RaisedButtons(props) {
  const {
    classes,
    children,
    onClick,
    type,
  } = props;

  return (
    <Button
      type={type}
      variant="contained"
      color="secondary"
      className={classes.button}
      onClick={onClick}
      {...props}
    >
        { children }
    </Button>
  );
}

RaisedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RaisedButtons);