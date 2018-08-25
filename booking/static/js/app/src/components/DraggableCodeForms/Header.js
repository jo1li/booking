import React from 'react';
import Grid from '@material-ui/core/Grid';

import { Display1 } from '../typography';

const Header = (props) => {
  const { classes, title } = props;

  return (
    <Grid container spacing={24} direction="row">
      <Grid className={classes.captionTop} item xs={12} sm={12} md={12} lg={12}>
        <Display1>{title}</Display1>
      </Grid>
    </Grid>
  );
}

export default Header;
