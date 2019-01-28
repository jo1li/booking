import React, { Component, Fragment } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import ActionCreators from '../../actions/actionCreators';
import autoBind from 'react-autobind';
import _ from 'lodash';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import {
  reduxForm,
  getFormValues,
} from 'redux-form';

import * as PhotoActions from '../../actions/photos';
import { CloudUpload } from '../icons';
import * as ProfileActions from '../../actions/profile';
import styles from './styles';
import { EDIT_PHOTOS } from '../../constants/forms';
import CancelConfirm from '../CancelConfirm';
import ModalHeader from '../ModalHeader';
import DraggablePhotoRows from './DraggablePhotoRows';
import DroppableContainer from '../dragAndDrop/DroppableContainer';
import CoverPhotoEditorForm from '../CoverPhotoEditorForm';
import { selectHasHeroImage } from '../../selectors/photosSelectors';
import {
  getUpdatedItems,
  getDestroyedItems,
  flagItemForRemoval,
} from '../../helpers/dragAndDropHelpers';
import {
  orientImage
} from '../../helpers/imageHelpers';

class PhotoUploadButton extends Component {
  handleChange(files) {
    const { handleChange } = this.props;
    if(!files.length) return;
    handleChange(files[0]);
  }

  render() {
    const { className, label } = this.props;
    return (
      <label className={className}>
        {label}
        <input ref={(ref) => { this.fileName = ref; }}
            style={{display: 'none'}}
            type="file"
            onChange={(e) => this.handleChange(e.target.files)} />
      </label>
    );
  }
}

class PhotoEditFormBase extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    const {
      profile,
      getArtistItems,
    } = this.props;

    getArtistItems({artistId: profile.id});
  }

  openCoverPhotoEditForm(image) {
    const {
      createCoverPhoto,
      openDialog,
      profile,
    } = this.props;

    this.props.openDialog(
      <CoverPhotoEditorForm
        image={image}
        onClickConfirm={file => createCoverPhoto({
          file,
          artistId: profile.id,
        })}
      />
    )
  }

  submit() {
    const {
      profile,
      updateArtistItem,
      destroyArtistItem,
      closeDialog,
      initialValues,
      currentValues,
    } = this.props;

    const currentItems = _.sortBy(
      _.filter(
        currentValues.photos,
        item => !item.removed
      ),
      item => item.order
    );
    const initialItems = initialValues.photos;

    const itemsToUpdate = getUpdatedItems({
      currentItems,
      initialItems,
      updatableFields: ['order'],
    });
    const itemsToDestroy = getDestroyedItems({currentItems, initialItems});

    const updateRequests = _.map(itemsToUpdate, (item) => {
      updateArtistItem({
        id: item.id,
        order: item.order,
        artistId: profile.id,
      });
    });

    const destroyRequests = _.map(itemsToDestroy, (item) => {
      destroyArtistItem({
        id: item.id,
        artistId: profile.id,
      });
    });

    const requests = _.concat(updateRequests, destroyRequests);

    // TODO: handle error
    Promise.all(requests).then(closeDialog);
  }

  removeItemFromForm(itemIndex) {
    const { currentValues, change } = this.props;
    // This will flag the item as removed, which allows us to do an animation
    // and hide it; we then filter when saving so items with this flag are
    // deleted.
    return flagItemForRemoval({
      currentItems: currentValues,
      change,
      itemIndex,
      itemName: 'photos',
    });
  }

  async previewAndUpload(file) {
    const {
      addToStore,
      removeFromStore,
      currentValues,
      profile,
      hasHeroImage,
      createArtistItem,
      createCoverPhoto,
    } = this.props;

    // TODO: support multiple pending images at once
    const pendingImage = {id: 1};

    // Preview the image
    orientImage(file, (result) => {
      pendingImage.image = result;
      addToStore(pendingImage);
    }, { maxWidth: 200 });

    // Cover photo could have been deleted since page was loaded, so don't
    // just check that the ID isn't null.
    if (!hasHeroImage) {
      await createCoverPhoto({
          file,
          artistId: profile.id,
      });
    } else {
      await createArtistItem({
        file,
        order: currentValues.photos.length,
        artistId: profile.id,
      });
    }

    removeFromStore(pendingImage);
  }

  render() {
    const {
      handleSubmit,
      provided,
      classes,
      currentValues,
      width,
      closeDialog,
      submitting,
      submitSucceeded,
      pendingPhotos,
      profile,
      theme,
    } = this.props;

    return (
      <Fragment>
        <ModalHeader classes={classes}>Edit Photos</ModalHeader>
        <div className={classes.scrollableBody} xs={12} sm={12} md={12} lg={12}>
          <form onSubmit={handleSubmit(this.submit)} ref={provided.innerRef}>
            <DraggablePhotoRows
                items={currentValues.photos}
                pendingItems={pendingPhotos}
                itemName={'photos'}
                classes={classes}
                width={width}
                theme={theme}
                heroImageURL={profile.hero_image_url}
                remove={(order) => this.removeItemFromForm(order)}
                onClickUseAsCoverPhoto={this.openCoverPhotoEditForm}
              />
            <PhotoUploadButton
                className={classes.photoEditFormSubmitButton}
                label={<Fragment><CloudUpload className={classes.uploadIcon}/> Upload Photo</Fragment>}
                handleChange={this.previewAndUpload} />
          </form>
        </div>
        <CancelConfirm
            onClickCancel={closeDialog}
            onClickConfirm={this.submit}
            isLoading={submitting}
            success={submitSucceeded}
            className={classes.footer} />
      </Fragment>
    )
  }
}

const DroppablePhotoEditFormBase = (props) => {
  const { classes, currentValues, change } = props;
  return (
    <DroppableContainer
        change={change}
        currentValues={currentValues}
        className={`${classes.container} ${classes.withFooter}`}
        itemName='photos' >
      <PhotoEditFormBase {...props} itemName='photos' />
    </DroppableContainer>
  );
};

const mapStateToProps = (state, props) => ({
  initialValues: {
    photos: _.sortBy(_.values(state.photos), p => p.order),
  },
  photos: _.sortBy(_.values(state.photos), p => p.order),
  indexedPhotos: state.photos, // Not in order, just indexed by ID
  pendingPhotos: state.pending_photos,
  profile: state.profile,
  currentValues: getFormValues(EDIT_PHOTOS)(state) || {},
  hasHeroImage: selectHasHeroImage(state)
});

const mapDispatchToProps = {
    getArtistItems: PhotoActions.getArtistPhotos,
    updateArtistItem: PhotoActions.updateArtistPhoto,
    createArtistItem: PhotoActions.createArtistPhoto,
    destroyArtistItem: PhotoActions.destroyArtistPhoto,
    addToStore: ActionCreators.pendingPhotosCreateOrUpdate,
    removeFromStore: ActionCreators.pendingPhotosDelete,
    updateProfile: ProfileActions.updateProfile,
    createCoverPhoto: PhotoActions.createCoverPhoto,
  }

const PhotoEditForm = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: EDIT_PHOTOS,
    // This allows `initialValues` to be updated
    enableReinitialize: true,
  }),
  withWidth(),
  withStyles(styles, { withTheme: true }),
)(DroppablePhotoEditFormBase);

export default PhotoEditForm;
