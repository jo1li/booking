import React from 'react';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash'

// TODO: generalize "how ot embed youtube videos"
const HelpSection = (props) => {
  const { classes, className, helpCopyRows } = props;

  return <Grid container direction="column" className={className || ''} spacing={24}>
    <Grid item xs={12} sm={8} md={8} lg={8} style={{fontWeight: 'bold'}}>How to embed YouTube Video</Grid>
    {
      _.map(helpCopyRows, row => {
        return <Grid item container direction="row">
          <Grid item xs={12} sm={6} md={6} lg={6} className={classes.helpScreenshotContainer}>{row[0]}</Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} className={classes.helpTextContainer}>{row[1]}</Grid>
        </Grid>;
      })
    }
  </Grid>;
}

export default HelpSection;
