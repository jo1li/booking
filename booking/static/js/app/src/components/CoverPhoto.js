import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import _ from 'lodash';

import Camera from 'react-feather/dist/icons/camera';
import Button from '@material-ui/core/Button';

import FullScreenDialog from './Dialog/FullScreenDialog';
import PhotoEditForm from './PhotoEditForm';

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  iconLeft: {
    marginRight: theme.spacing.unit,
  },
  notClickable: {
  },
  clickable: {
    opacity: '0.9',
    cursor: 'pointer',
    transition: 'opacity 0.3s',

    '&:hover, &:focus': {
      outline: 'none',
      opacity: '1.0',
    }
  },
  coverPhotoCTA: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  }
})

class CoverPhoto extends React.Component {
  openPhotoEditDialog = () => {
    const { openDialog } = this.props;
    openDialog(
      <PhotoEditForm/>
    )
  }
  render() {
    const { photos, profile, isEditable, classes } = this.props;
    const coverPhoto = photos[_.get(profile, 'image_hero.id', null)];
    // NB: cover-photo-bar needs to be here in order for sticky
    // artist card to work when there is no cover photo
    if(!coverPhoto) {
      return (
        <div id="cover-photo-empty">
          {isEditable && (
            <div className={classes.coverPhotoCTA}>
              <Button color="primary" className={classes.button} onClick={() => this.openPhotoEditDialog()}><Camera className={classes.iconLeft} size={22}/> Add a Cover Photo</Button>
            </div>
          )}
          <div id="cover-photo-bar">
            <div id="cover-photo-fade-placeholder"/>
          </div>
        </div>
      );
    }
  
    return (
      <div
        id="cover-photo"
        tabIndex={0}
        className={_.size(photos) ? classes.clickable : ''}
        style={{
          backgroundImage: `url(${coverPhoto.image})`,
      }}>
        <div id="cover-photo-bar">
          <div id="cover-photo-fade"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  photos: state.photos,
  profile: state.profile,
  isEditable: state.is_current_user,
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
  FullScreenDialog,
)(CoverPhoto);
