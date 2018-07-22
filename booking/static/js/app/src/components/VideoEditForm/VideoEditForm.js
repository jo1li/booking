// TODO: There is a lot of duplication between this module and UserEditForm.
//       Plenty to DRY up.
// TODO: This form isn't accessible if the user doesn't have any videos,
//       because we only show the carousel with its heading and edit buttons
//       if the user has videos. What should the entrypoint be for first videos?

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

class VideoEditForm extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    const {
      getMusicianVideos,
      profile,
    } = this.props;

    getMusicianVideos({musicianId: profile.id});
  }

  getChangedVideos() {
    const {
      currentValues,
      initialValues,
    } = this.props;

    const currentVideos = currentValues.videos;
    const initialVideos = initialValues.videos;

    return _.transform(currentVideos, (diff, video, videoId) => {
      if (!_.isEqual(video.code, initialVideos[videoId].code)) {
        diff[videoId] = video;
      }
    });
  }

  submit(values) {
    const {
      profile,
      updateMusicianVideo,
      createMusicianVideo,
    } = this.props;

    const videosToUpdate = this.getChangedVideos();

    let requests = _.map(videosToUpdate, (video) => {
      updateMusicianVideo({
        videoId: video.id,
        code: video.code,
        musicianId: profile.id,
      });
    });

    if(_.get(values, 'new_video.code')) {
      requests.append(
        createMusicianVideo({code: values.new_video.code, musicianId: profile.id})
      );
    }

    // TODO: handle error
    Promise.all(requests).then(closeDialog);
  }

  render() {
    const {
        closeDialog,
        change,
        submitting,
        handleSubmit,
        classes,
        currentValues,
        submitSucceeded,
    } = this.props;

    // TODO: Do we want to add multiple videos? Not in design specs but seems right
    // TODO: Design specs list a "move" button, which is doable, but backend
    //       doesn't have a notion of orthogonal video order.
    // TODO: Design specs list a "help" button - what do we want this to do/say?
    //       How does user interact with it on mobile and on desktop?
    // TODO: Buttons should have text, and should be above the "code" textarea

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
              {
                _.map(_.get(currentValues, 'videos', {}), (video, videoId) => {
                  return (
                    <InputButtons
                      component={TextArea}
                      key={`iframe-input-${videoId}`}
                      id={`iframe-input-${videoId}`}
                      label={`iframe-input-${videoId}`}
                      name={`videos[${videoId}].code`}
                      placeholder="Copy and paste video player embed code here."
                    >
                      <DeleteButton
                        caption="clear"
                        disabled={!_.get(currentValues, `videos[${videoId}]`, '')}
                        onClick={() => change(`videos[${videoId}]`, '')}
                      />
                    </InputButtons>
                  );
                })
              }
              { /* One more, for adding a new video */ }
              <InputButtons
                component={TextArea}
                id='iframe-input-last'
                label='iframe-input-last'
                name='new_video.code'
                placeholder="Copy and paste video player embed code here."
              >
                <DeleteButton
                  disabled={!_.get(currentValues, `new_video`, '')}
                  onClick={() => change(`new_video`, '')}
                />
              </InputButtons>
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
  },
  videos: state.videos,
  profile: state.profile,
  currentValues: getFormValues(EDIT_VIDEOS)(state),
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getMusicianVideos: VideoActions.getMusicianVideos,
    updateMusicianVideo: VideoActions.updateMusicianVideo,
    createMusicianVideo: VideoActions.createMusicianVideo,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoEditForm);
