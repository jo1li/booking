import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { getOpusThumbnailImageURL } from '../../helpers/imageHelpers';
import { Code, CheckCircle, Delete } from '../icons';
import * as ProfileActions from '../../actions/profile';

const DeleteButton = (props) => {
  const { color, ...remainingProps } = props;
  return <IconButton {...remainingProps}><Delete color={color}/></IconButton>;
}

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
  const { classes, onClickUseAsCoverPhoto, item } = props;
  return (
    <div
      className={classes.coverPhotoIndicator}
    >
      <CheckCircle className={classes.coverPhotoIndicatorCheckMark}/>
        Cover photo
        <span
          onClick={() => onClickUseAsCoverPhoto(item.image)}
          className={classes.editCoverPhotoButton}
        >
          Edit
        </span>
    </div>
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
  const { isCoverPhoto, onClickUseAsCoverPhoto, show, classes, item } = props;

  if(!show) return null;

  if(isCoverPhoto) {
    return <CoverPhotoIndicator classes={classes} onClickUseAsCoverPhoto={onClickUseAsCoverPhoto} item={item}/>;
  } else {
    return <SetAsCoverPhotoButton onClick={() => onClickUseAsCoverPhoto(item.image)} item={item} classes={classes} />;
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
    onClickUseAsCoverPhoto,
    theme,
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
        onClickUseAsCoverPhoto={onClickUseAsCoverPhoto} />
    <DeleteButton
        onClick={() => remove(idx)}
        color={theme.palette.secondary.main}
        className={`${classes.button} ${classes.deleteButton}`} />
  </Grid>
}

const BottomRow = (props) => {
  const {
    classes,
    width,
    isCoverPhoto,
    onClickUseAsCoverPhoto,
    item,
  } = props;

  return <Grid item className={classes.photoFormRowBottom}>
    <CoverPhotoIndicatorGate
        show={width === 'xs'}
        classes={classes}
        item={item}
        isCoverPhoto={isCoverPhoto}
        onClickUseAsCoverPhoto={onClickUseAsCoverPhoto} />
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

  render() {
    return (
      <PhotoRowBase
        TopRow={TopRow}
        BottomRow={BottomRow}
        {...this.props}
      />
    );
  }
}

const mapDispatchToProps =  {
    updateProfile: ProfileActions.updateProfile,
};

export default connect(null, mapDispatchToProps)(PhotoRow);
