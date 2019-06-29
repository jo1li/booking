import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';

import Camera from 'react-feather/dist/icons/camera';
import Button from '@material-ui/core/Button';

import { Dialog } from './Dialog';
// import PhotoEditForm from './PhotoEditForm';
import CoverPhotoEditorForm from './CoverPhotoEditorForm';
import { UnstyledImageUploadContainer } from './form/ImageUploadContainer'
import { selectProfile } from '../selectors/profileSelectors';
import * as PhotoActions from '../actions/photos';
import * as ProfileActions from '../actions/profile';
import { getFormData } from '../utils/formHelpers';
import { ADD_COVER_PHOTO } from '../constants/forms';

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
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    }
  }
});

// ImageUploadContainer needs to be within a redux form
const AddCoverPhotoForm = reduxForm({form: ADD_COVER_PHOTO})((props) => {
  const { classes, onUpload } = props;
  return (
    <div className={classes.coverPhotoCTA}>
      <UnstyledImageUploadContainer onUpload={onUpload}>
        <Button color="primary" className={classes.button} >
          <Camera className={classes.iconLeft} size={22}/> Add a Cover Photo
        </Button>
      </UnstyledImageUploadContainer>
    </div>
  );
});

class CoverPhoto extends React.Component {
  openPhotoEditDialog = imageFileObject => {
    const {
      openDialog,
      updateArtistPhoto,
      createArtistPhoto,
      updateProfile,
      profile,
    } = this.props;

    openDialog(
      <CoverPhotoEditorForm
        image={imageFileObject.src}
        onClickConfirm={({positionY}) => createArtistPhoto({
          artistId: profile.id,
          photoObject: {
            image: {
              isFile: true,
              blob: imageFileObject.file,
              fileName: imageFileObject.name,
            },
            data: {
              coverPhotoStyles: {
                top: positionY,
              },
            },
          },
        }).then((res) => updateProfile(
          { image_hero_id: res.data.id },
          profile.id
        ))}  />
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
            <AddCoverPhotoForm classes={classes} onUpload={(values) => this.openPhotoEditDialog(values)} />
          )}
          <div id="cover-photo-bar">
            <div id="cover-photo-fade-placeholder"/>
          </div>
        </div>
      );

      return <div id="cover-photo-empty"/>;
    }

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
  createArtistPhoto: PhotoActions.createArtistPhoto,
  updateProfile: ProfileActions.updateProfile,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  Dialog,
)(CoverPhoto);
