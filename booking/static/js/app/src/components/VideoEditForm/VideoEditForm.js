// TODO: There is a lot of duplication between this module and UserEditForm.
//       Plenty to DRY up.
import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux';
import {
  reduxForm,
  getFormValues,
} from 'redux-form';
import autoBind from 'react-autobind';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash'

import CancelConfirm from '../CancelConfirm';
import FullScreenDialog from '../modal/FullScreenDialog';

import { Display1, Caption } from '../typography';

import InputButtons from './InputButtons';
import {
  DeleteButton,
  AddButton,
} from '../form/FabButton';

import TextArea from '../form/TextArea';

import * as VideoActions from '../../actions/videos';
import styles from './styles';

import { EDIT_VIDEOS } from '../../constants/forms';

const VideoCodeInput = (props) => {
  const { video, path, canBeDeleted, change } = props;

  return (
    <InputButtons
      component={TextArea}
      key={`input-${path}`}
      name={`${path}.code`}
      value=''
      placeholder="Copy and paste video player embed code here."
    >
      <DeleteButton
        caption="clear"
        disabled={!canBeDeleted}
        onClick={() => change(path, '')}
      />
    </InputButtons>
  );
}

class VideoEditForm extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    const {
      getArtistVideos,
      profile,
    } = this.props;

    getArtistVideos({artistId: profile.id});
  }

  ensureBlankInputAvailable() {
    const { currentValues, change } = this.props;
    const newVideos = currentValues.newVideos;
    const allVideosHaveCodes = _.every(newVideos, v => !!v.code);

    if(allVideosHaveCodes) {
      change(`newVideos[${_.size(newVideos)}]`, {});
    }
  }

  getUpdatedVideos() {
    const {
      currentValues: { videos: currentVideos },
      initialValues: { videos: initialVideos },
    } = this.props;

    return _.transform(currentVideos, (diff, video, videoId) => {
      if (video.code !== initialVideos[videoId].code) {
        diff[videoId] = video;
      }
    });
  }

  getCreatedVideos() {
    const { currentValues: { newVideos } } = this.props;
    // Only provide for creation if a code was entered for the video
    return _.filter(newVideos, v => !!v.code);
  }

  submit(values) {
    const {
      profile,
      updateArtistVideo,
      createArtistVideo,
      closeDialog,
    } = this.props;

    const videosToUpdate = this.getUpdatedVideos();
    const videosToCreate = this.getCreatedVideos();

    const updateRequests = _.map(videosToUpdate, (video) => {
      updateArtistVideo({
        videoId: video.id,
        code: video.code,
        artistId: profile.id,
      });
    });

    const createRequests = _.map(videosToCreate, (video) => {
      createArtistVideo({
        code: video.code,
        artistId: profile.id,
      });
    });

    const requests = _.concat(updateRequests, createRequests);

    // TODO: handle error
    Promise.all(requests).then(closeDialog);
  }

  renderExistingVideoInputs() {
    const { currentValues, change } = this.props;

    return _.map(currentValues.videos, (video, videoId) => {
      return <VideoCodeInput video={video} path={`videos[${videoId}]`} change={change} />;
    });
  }

  renderNewVideoInputs() {
    const { currentValues, change } = this.props;

    return _.map(currentValues.newVideos, (video, videoIdx) => {
      return <VideoCodeInput video={video} path={`newVideos[${videoIdx}]`} change={change} />;
    });
  }

  render() {
    const {
        closeDialog,
        submitting,
        handleSubmit,
        classes,
        currentValues,
        submitSucceeded,
    } = this.props;

    // TODO: Implement "move".
    // TODO: Design specs list a "help" button - what do we want this to do/say?
    //       How does user interact with it on mobile and on desktop?
    // TODO: Buttons should have text, and should be above the "code" textarea

    this.ensureBlankInputAvailable();

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <CancelConfirm
          onClickCancel={closeDialog}
          isLoading={submitting}
          success={submitSucceeded}
        >
          <Grid container spacing={24} direction="row">
            <Grid className={classes.captionTop} item xs={12} sm={12} md={12} lg={12}>
              <Display1>Edit Videos</Display1>
            </Grid>
              { /* TODO: this is a spacing/style hack, remove */ }
              <Grid className={classes.caption} item xs={12} sm={12} md={12} lg={12}>
              </Grid>
              { this.renderExistingVideoInputs() }
              { this.renderNewVideoInputs() }
          </Grid>
        </CancelConfirm>
      </form>
    );
  }
}

VideoEditForm = withStyles(styles)(VideoEditForm)

VideoEditForm = compose(
    FullScreenDialog,
)(VideoEditForm);

VideoEditForm = reduxForm({
  form: EDIT_VIDEOS,
  // This allows `initialValues` to be updated below
  enableReinitialize: true,
})(VideoEditForm);

const mapStateToProps = (state, props) => ({
  initialValues: {
    videos: state.videos,
    newVideos: { 0: {} }, // Start with an empty field for the user to add a new video
  },
  videos: state.videos,
  profile: state.profile,
  currentValues: getFormValues(EDIT_VIDEOS)(state),
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getArtistVideos: VideoActions.getArtistVideos,
    updateArtistVideo: VideoActions.updateArtistVideo,
    createArtistVideo: VideoActions.createArtistVideo,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoEditForm);
