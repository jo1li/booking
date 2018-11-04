import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';

import { Code, CircularProgress } from '../icons';

// NB: No drag-and-drop for pending rows, so this is just a placeholder
const PlacholderDragHandle = (props) => {
  const { classes } = props;
  return (
    <div className={classes.dragHandle}>
      <Code className={classes.dragHandleIcon}/>
    </div>
  );
};

const ProgressThing = (props) => {
  const { show, classes } = props;

  return (
    <Fragment>
      <CircularProgress className={classes.loadingIcon} size="24px" />
      <a className={classes.loadingText}>Processing { show ? 'Image' : ''}</a>
    </Fragment>
  );
}

const PendingTopRow = (props) => {
  const {
    classes,
    width,
    itemName,
    item,
    idx,
  } = props;

  return (
    <Grid item container direction="row" className={classes.photoFormRowTop}>
      <PlacholderDragHandle classes={classes} />
      <div className={classes.editPhotoImageWrapper} style={{textAlign: 'center'}}>
        <img src={item.image || ''} className={classes.previewPhoto} alt="thumbnail"/>
        <input type="hidden" value={item.id} name={`${itemName}[${idx}]`}/>
      </div>
      <ProgressThing show={width !== 'xs'} classes={classes} />
    </Grid>
  );
}

const PendingBottomRow = (props) => {
  const { classes } = props;
  return (
    <Grid container item className={classes.photoFormRowBottom} />
  );
}

const PendingPhotoRow = (props) => {
    const {classes} = props;
    return <div
          className={classes.photoFormRowContainer} >
        <Grid container direction="column" className={`${classes.photoFormRow} ${classes.pendingPhotoFormRow}`}>
            <PendingTopRow {...props}/>
            <PendingBottomRow {...props} />
        </Grid>
    </div>
}

export default PendingPhotoRow;
