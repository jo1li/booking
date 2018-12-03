import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';

const GettingStarted = (props) => {
  const { classes, className, goToTab, copy, showHelpLink } = props;

  return <Fragment>
    <div className={className || ''}>
      <Grid container direction="row" spacing={32}>
        <Grid container item direction="column" xs={12} sm={6} md={6} lg={6}>
          <Grid className={classes.mobileHowTo} item>{copy.mobileHowTo}</Grid>
          <Grid className={classes.howTo} item>{copy.howTo}</Grid>
          <Grid item>
            {
              showHelpLink ?
              <button
                  className={classes.gettingStartedHelpButton}
                  onClick={() => goToTab(1)}>
                View help
              </button> :
              null
            }
          </Grid>
        </Grid>
        <Grid container item direction="column" className={classes.gettingStartedExampleContainer} xs={0} sm={6} md={6} lg={6}>
          <Grid item>Embed codes look like this</Grid>
          <Grid item className={classes.gettingStartedExample}>{copy.example}</Grid>
        </Grid>
      </Grid>
    </div>
  </Fragment>;
}

export default GettingStarted;
