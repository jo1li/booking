import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Close } from '../components/icons';

const styles = theme => ({
  closeButton: {
    fill: theme.palette.primaryTonal[500],
  },
});

const CloseComponent = (props) => {
  const { classes, onClick } = props;
  return (
    <Close
      onClick={onClick}
      className={classes.closeButton}/>
  );
};

export default withStyles(styles)(CloseComponent);
