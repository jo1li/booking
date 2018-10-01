import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import ActionCreators from '../../actions/actionCreators';
import autoBind from 'react-autobind';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import {
  reduxForm,
  getFormValues,
} from 'redux-form';

import boundToOpenElement from '../modal/boundToOpenElement';
import * as PhotoActions from '../../actions/photos';
import styles from './styles';
import { EDIT_PHOTOS } from '../../constants/forms';
import FullScreenDialog from '../modal/FullScreenDialog';
import CancelConfirm from '../CancelConfirm';
import DraggablePhotoRows from './DraggablePhotoRows';
import { Display1 } from '../typography';
import DroppableContainer from '../DroppableContainer';
import {
  getUpdatedItems,
  getDestroyedItems,
  flagItemForRemoval,
} from '../../helpers/dragAndDropHelpers';

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

  previewAndUpload(file) {
    const { addToStore, removeFromStore, currentValues, profile } = this.props;

    // TODO: support multiple pending images at once
    const pendingImage = {id: 1};

    // Preview the image
    const reader = new FileReader();
    reader.addEventListener('load', function () {
      pendingImage.image = reader.result;
      addToStore(pendingImage);
    }, false);
    reader.readAsDataURL(file);

    // Send it to the server, and remove the preview when complete
    const data = new FormData();
    data.append('image', file);

    this.props.createArtistItem({
      file: data,
      order: currentValues.photos.length,
      artistId: profile.id,
    }, () => {
      removeFromStore(pendingImage);
    });
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
    } = this.props;

    return <Grid container spacing={24}>
      <Grid item className={classes.caption} xs={12} sm={12} md={12} lg={12}>
        <Display1>Edit Photos</Display1>
      </Grid>
      <Grid item className={classes.captionTop} xs={12} sm={12} md={12} lg={12}>
        <form onSubmit={handleSubmit(this.submit)} ref={provided.innerRef}>
          <DraggablePhotoRows
              items={currentValues.photos}
              pendingItems={pendingPhotos}
              itemName={'photos'}
              classes={classes}
              width={width}
              heroImageURL={profile.hero_image_url}
              remove={(order) => this.removeItemFromForm(order)} />
          <PhotoUploadButton
              className={classes.photoEditFormSubmitButton}
              label={'+ Upload Photo'}
              handleChange={this.previewAndUpload} />
        </form>
        <CancelConfirm
            onClickCancel={closeDialog}
            onClickConfirm={this.submit}
            isLoading={submitting}
            success={submitSucceeded}
            isContainer={false} />
      </Grid>
    </Grid>
  }
}

const DroppablePhotoEditFormBase = (props) => (
  <DroppableContainer {...props} itemName='photos' WrappedComponent={PhotoEditFormBase} />
);

const mapStateToProps = (state, props) => ({
  initialValues: {
    photos: _.sortBy(_.values(state.photos), p => p.order),
  },
  photos: _.sortBy(_.values(state.photos), p => p.order),
  pendingPhotos: state.pending_photos,
  profile: state.profile,
  currentValues: getFormValues(EDIT_PHOTOS)(state) || {},
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getArtistItems: PhotoActions.getArtistPhotos,
    updateArtistItem: PhotoActions.updateArtistPhoto,
    createArtistItem: PhotoActions.createArtistPhoto,
    destroyArtistItem: PhotoActions.destroyArtistPhoto,
    addToStore: ActionCreators.pendingPhotosCreateOrUpdate,
    removeFromStore: ActionCreators.pendingPhotosDelete,
  }, dispatch);
};

const PhotoEditForm = compose(
  boundToOpenElement('open-edit-photos'),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: EDIT_PHOTOS,
    // This allows `initialValues` to be updated
    enableReinitialize: true,
  }),
  withStyles(styles),
  withWidth(),
  FullScreenDialog,
)(DroppablePhotoEditFormBase);

export default PhotoEditForm;
