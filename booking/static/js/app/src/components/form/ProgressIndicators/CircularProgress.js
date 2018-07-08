
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  progress: {
    color: theme.palette.secondary.light,
  },
});

export default withStyles(styles)(({ classes }) => <CircularProgress size={20} className={classes.progress}/>)