import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { getOpusThumbnailImageURL } from '../../helpers/imageHelpers';
import { Code, CheckCircle, Delete } from '../icons';
import * as ProfileActions from '../../actions/profile';

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
    ><CheckCircle className={classes.coverPhotoIndicatorCheckMark}/> Cover photo</a>
  );
};

const SetAsCoverPhotoButton = (props) => {
  const { onClick, classes, item } = props;
  // Would be better to be an <a> but bootstrap gets precedence on anchor styles
  // unfortunately and undoes our preferred color
  return (
    <span
      className={classes.setAsCoverPhotoButton}
      onClick={() => onClick(item)}
    >Set as cover photo</span>
  );
}

const CoverPhotoIndicatorGate = (props) => {
  const { isCoverPhoto, useAsCoverPhoto, show, classes, item } = props;

  if(!show) return null;

  if(isCoverPhoto) {
    return <CoverPhotoIndicator classes={classes} />;
  } else {
    return <SetAsCoverPhotoButton onClick={useAsCoverPhoto} item={item} classes={classes} />;
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
    isCoverPhoto,
    useAsCoverPhoto,
  } = props;

  return <Grid item container direction="row" className={classes.photoFormRowTop}>
    <DragHandle
        dndProvidedProps={dndProvidedProps}
        classes={classes} />
    <div className={classes.editPhotoImageWrapper} style={{textAlign: 'center'}}>
      <img src={item.image && getOpusThumbnailImageURL(item.image)} className={classes.photoImg} alt="thumbnail"/>
      <input type="hidden" value={item.id} name={`${itemName}[${idx}]`}/>
    </div>
    <CoverPhotoIndicatorGate
        show={width !== 'xs'}
        classes={classes}
        isCoverPhoto={isCoverPhoto}
        item={item}
        useAsCoverPhoto={useAsCoverPhoto} />
    <DeleteButton
        onClick={() => remove(idx)}
        className={`${classes.button} ${classes.deleteButton}`} />
  </Grid>
}

const BottomRow = (props) => {
  const {
    classes,
    width,
    isCoverPhoto,
    useAsCoverPhoto,
    item,
  } = props;

  return <Grid item className={classes.photoFormRowBottom}>
    <CoverPhotoIndicatorGate
        show={width === 'xs'}
        classes={classes}
        item={item}
        isCoverPhoto={isCoverPhoto}
        useAsCoverPhoto={useAsCoverPhoto} />
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
  constructor(props) {
    super(props);
    autoBind(this);
  }

  useAsCoverPhoto(photo) {
    const { profile, updateProfile } = this.props;
    return updateProfile({image_hero_id: photo.id}, profile.id);
  }

  render() {
    return (
      <PhotoRowBase
        TopRow={TopRow}
        BottomRow={BottomRow}
        {...this.props}
        useAsCoverPhoto={this.useAsCoverPhoto} />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateProfile: ProfileActions.updateProfile,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(PhotoRow);
