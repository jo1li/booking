import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash'

const HelpSection = (props) => {
  const { classes, className, helpCopyRows, goToTab } = props;
  return <Fragment>
    <div className={className || ''}>
      <Grid container direction="column" spacing={24}>
        {
          _.map(helpCopyRows, (row, idx) => {
            return <Grid item container direction="row" key={`help-section-row-${idx}`}>
              <Grid item xs={12} sm={false} className={classes.helpScreenshotContainer}>{row[0]}</Grid>
              <Grid item className={classes.helpRowNumber}>{idx + 1}</Grid>
              <Grid item className={classes.helpTextContainer}>{row[1]}</Grid>
            </Grid>;
          })
        }
      </Grid>
    </div>
    <div className={classes.helpSectionFooter}>
      <button
          className={classes.helpSectionBackButton}
          onClick={() => goToTab(0)}>
        Back to embeds
      </button>
    </div>
  </Fragment>;
}

export default HelpSection;
