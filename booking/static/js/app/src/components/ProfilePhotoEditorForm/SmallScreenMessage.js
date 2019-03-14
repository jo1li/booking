import React from 'react';
import Typography from '@material-ui/core/Typography';

const SmallScreenMessage = (props)  =>{
  const { classes } = props;

  return (
    <Typography variant="body1" className={classes.smallScreenMessage}>
      Pinch and zoom to set the visible area of the image.
    </Typography>
  );
}

export default SmallScreenMessage;
