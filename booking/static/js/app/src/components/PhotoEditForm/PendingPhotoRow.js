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
  const { show } = props;

  return (
    <Fragment>
      <CircularProgress size="24px" style={{marginLeft: '24px', alignSelf: 'center'}}/>
      <a style={{marginLeft: '8px', alignSelf: 'center', color: 'black', letterSpacing: '0.3px'}}>Processing { show ? 'Image' : ''}</a>
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
      <ProgressThing show={width !== 'xs'} />
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
