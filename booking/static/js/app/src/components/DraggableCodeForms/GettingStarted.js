import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';

const GettingStarted = (props) => {
  const { classes, className, goToTab, copy } = props;

  return <Fragment>
    <div className={className || ''}>
      <Grid container direction="row" spacing={32}>
        <Grid container item direction="column" xs={6} sm={6} md={6} lg={6}>
          <Grid item>{copy.howTo}</Grid>
          <Grid item>
            <button
                className={classes.gettingStartedHelpButton}
                onClick={() => goToTab(1)}>
              View help
            </button>
          </Grid>
        </Grid>
        <Grid container item direction="column" xs={6} sm={6} md={6} lg={6}>
          <Grid item>Embed codes look like this</Grid>
          <Grid item className={classes.gettingStartedExample}>{copy.example}</Grid>
        </Grid>
      </Grid>
    </div>
  </Fragment>;
}

export default GettingStarted;
