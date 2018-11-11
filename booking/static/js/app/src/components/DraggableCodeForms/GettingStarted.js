import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';

import {
  LEFT_DOUBLE_QUOTES,
  RIGHT_DOUBLE_QUOTES,
} from '../../constants/unicodeCharacters';

// TODO: Either disable this for audio, or accept copy from caller

const GettingStarted = (props) => {
  const { classes, className, goToTab } = props;

  return <Fragment>
    <div className={className || ''}>
      <Grid container direction="row" spacing={32}>
        <Grid container item direction="column" xs={6} sm={6} md={6} lg={6}>
          <Grid item>{`To get started, find a YouTube video, hit the Share button, and then look for the ${LEFT_DOUBLE_QUOTES}Embed${RIGHT_DOUBLE_QUOTES} option. Paste the embed code below.`}</Grid>
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
          <Grid item className={classes.gettingStartedExample}>{`<iframe width="560" height="315" src="https://www.youtube.com/embed/0he7sPQ7xwE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`}</Grid>
        </Grid>
      </Grid>
    </div>
  </Fragment>;
}

export default GettingStarted;
