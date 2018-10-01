import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { getThumbnailImageURL } from '../../helpers/imageHelpers';
import { Code, CheckCircle, Delete } from '../icons';
import {
  updateUserBio,
} from '../../request/requests';

// TODO: Using `IconButton` but rectangle shape for this gives an oblong hover
// background; change jss to cope with this
const DeleteButton = (props) => <IconButton {...props}><Delete/></IconButton>;

class DragHandle extends Component {
  render() {
    const { dndProvidedProps, classes } = this.props;
    // Note: `button` would be more semantic than `div` but `button` gives
    // `draggable=false` for some reason.
    return (
      <div {...dndProvidedProps.dragHandleProps} className={classes.dragHandle}>
        <Code className={classes.dragHandleIcon}/>
      </div>
    );
  }
}

const CoverPhotoIndicator = (props) => {
  const { classes } = props;
  return (
    <a
      className={classes.coverPhotoIndicator}
    >{CheckCircle} Cover photo</a>
  );
};

const SetAsCoverPhotoButton = (props) => {
  const { onClick, classes } = props;
  // Would be better to be an <a> but bootstrap gets precedence on anchor styles
  // unfortunately and undoes our preferred color
  return (
    <span
      className={classes.setAsCoverPhotoButton}
      onClick={onClick}
    >Set as cover photo</span>
  );
}

const CoverPhotoIndicatorGate = (props) => {
  const { isHeroImage, useAsHero, show, classes } = props;

  if(!show) return null;

  if(isHeroImage) {
    return <CoverPhotoIndicator onClick={useAsHero} classes={classes} />;
  } else {
    return <SetAsCoverPhotoButton classes={classes} />;
  }
}

const TopRow = (props) => {
  const {
    remove,
    dndProvidedProps,
    classes,
    width,
    itemName,
    item,
    idx,
  } = props;

  const isHeroImage = false; // TODO: needs to be dynamic once we have a way to do that

  return <Grid item container direction="row" className={classes.photoFormRowTop}>
    <DragHandle
        dndProvidedProps={dndProvidedProps}
        classes={classes} />
    <div className={classes.editPhotoImageWrapper} style={{textAlign: 'center'}}>
      <img src={item.image && getThumbnailImageURL(item.image)} className={classes.photoImg} alt="thumbnail"/>
      <input type="hidden" value={item.id} name={`${itemName}[${idx}]`}/>
    </div>
    <CoverPhotoIndicatorGate
        show={width !== 'xs'}
        classes={classes}
        isHeroImage={isHeroImage}
        useAsHero={() => { /* TODO: make this do something once we have functionality */ }} />
    <DeleteButton
        onClick={() => remove(idx)}
        className={`${classes.button} ${classes.deleteButton}`} />
  </Grid>
}

const BottomRow = (props) => {
  const {
    classes,
    width,
  } = props;

  const isHeroImage = false;

  return <Grid item className={classes.photoFormRowBottom}>
    <CoverPhotoIndicatorGate
        show={width === 'xs'}
        classes={classes}
        isHeroImage={isHeroImage}
        useAsHero={() => { /* TODO: make this do something once we have functionality */ }} />
  </Grid>
}

// NB: this needs to be a class for react dnd to work.
class PhotoRowBase extends Component {
  render() {
    const {
      innerRef,
      dndProvidedProps,
      classes,
      item,
      TopRow,
      BottomRow,
    } = this.props;

    return (
      <div
          ref={innerRef}
          {...dndProvidedProps.draggableProps}
          className={`${classes.photoFormRowContainer} ${item.removed ? classes.removed : ''}`} >
        <Grid container direction="column" className={`${classes.photoFormRow}`}>
          <TopRow {...this.props}/>
          <BottomRow {...this.props}/>
        </Grid>
      </div>
    );
  }
}

class PhotoRow extends Component {
  useAsHero(imageURL) {
    const { profile } = this.props;
    // TODO: send up the ID, not url, once this endpoint actually accepts
    // changes to image hero with existing image instead of just file
    return updateUserBio({image_hero: imageURL}, profile.id);
  }

  render() {
    return (
      <PhotoRowBase TopRow={TopRow} BottomRow={BottomRow} {...this.props}/>
    );
  }
}

export default PhotoRow;
