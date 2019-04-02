import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import _ from 'lodash';

import Camera from 'react-feather/dist/icons/camera';
import Button from '@material-ui/core/Button';

import { Dialog } from './Dialog';
// import PhotoEditForm from './PhotoEditForm';
import CoverPhotoEditorForm from './CoverPhotoEditorForm';
import ImageUploadContainer from './form/ImageUploadContainer'
import { selectProfile } from '../selectors/profileSelectors';
import * as PhotoActions from '../actions/photos';
import { getFormData } from '../utils/formHelpers';

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
  openPhotoEditDialog = imageFile => {
    const {
      openDialog,
      updateArtistPhoto,
      profile
    } = this.props;

    // TODO: where is this supposed to run?
    openDialog(
      <CoverPhotoEditorForm
        image={imageFile.src}
        imageName={imageFile.name}
        onClickConfirm={({positionY}) => updateArtistPhoto({
          artistId: profile.id,
          imageId: profile.image_hero_id,
          backgroundImageTop: positionY,
        })}
      />
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
               <ImageUploadContainer
                  onUpload={values => this.openPhotoEditDialog(values)}
                >
                  <Button color="primary" className={classes.button} ><Camera className={classes.iconLeft} size={22}/> Add a Cover Photo</Button>
              </ImageUploadContainer>
            </div>
          )}
          <div id="cover-photo-bar">
            <div id="cover-photo-fade-placeholder"/>
          </div>
        </div>
      );
    }

    // TODO: Add this on load once ironed out
    const topPosition = _.get(coverPhoto, 'data.coverPhotoStyles.top');
    const position = topPosition ? `0 ${Math.round(topPosition * 100)}%` : 'center';

    return (
      <div
        id="cover-photo"
        tabIndex={0}
        className={_.size(photos) ? classes.clickable : ''}
        style={{
          backgroundPosition: position,
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
  profile: selectProfile(state),
  isEditable: state.is_current_user,
});

const mapDispatchToProps = {
  updateArtistPhoto: PhotoActions.updateArtistPhoto,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  Dialog,
)(CoverPhoto);
