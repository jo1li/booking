import React from 'react';
import { Title } from './typography';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';

const ModalHeader = (props) => {
  const { classes, hasTabs, children } = props;

  // TODO: You can probably change this from 'caption' to more meaningful 'header' or 'headline'
  const captionClassName = hasTabs ? classes.captionAboveTabs : classes.caption;

  return (
    <Grid
        item
        className={classNames(captionClassName, classes.fixedHeight)}
        xs={12} sm={12} md={12} lg={12}>
      <Title>{children}</Title>
    </Grid>
  );
}

export default ModalHeader;
