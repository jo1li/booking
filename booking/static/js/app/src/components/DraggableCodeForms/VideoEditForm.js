// TODO: This can be DRYed up a little bit more with AudioEditForm, but want
//       to wait until DRYing up with other modals so we don't abstract at wrong
//       level and make more work for ourselves
import React from 'react';
import { bindActionCreators, compose } from 'redux'
import {
  reduxForm,
  getFormValues,
} from 'redux-form';
import { connect } from 'react-redux';
import DraggableCodeFormBase from './DraggableCodeFormBase';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import { EDIT_VIDEOS } from '../../constants/forms';
import styles from './styles';
import * as VideoActions from '../../actions/videos';
import {
  LEFT_DOUBLE_QUOTES,
  RIGHT_DOUBLE_QUOTES,
} from '../../constants/unicodeCharacters';
import { validate_video_embeds } from '../../utils/validators';

const title = 'Edit Videos';

const inputPlaceholder = 'Copy and paste video player embed code here.';

const helpSectionTitle = 'How to embed YouTube Video';

// TODO: Use real screenshots once we have them
const helpRows = [
  [
    <img src="https://www.freeiconspng.com/uploads/no-image-icon-6.png" alt="Screenshot"/>,
    `Go to the YouTube page of the video you want to add and click on the ${LEFT_DOUBLE_QUOTES}SHARE${RIGHT_DOUBLE_QUOTES} button.`,
  ], [
    <img src="https://www.freeiconspng.com/uploads/no-image-icon-6.png" alt="Screenshot"/>,
    `Select the ${LEFT_DOUBLE_QUOTES}Embed${RIGHT_DOUBLE_QUOTES} option to display the embed video code.`,
  ], [
    <img src="https://www.freeiconspng.com/uploads/no-image-icon-6.png" alt="Screenshot"/>,
    `Click ${LEFT_DOUBLE_QUOTES}COPY${RIGHT_DOUBLE_QUOTES} to copy the entire embed video code.`,
  ], [
    <img src="https://www.freeiconspng.com/uploads/no-image-icon-6.png" alt="Screenshot"/>,
    `Go back to the ${LEFT_DOUBLE_QUOTES}Embed${RIGHT_DOUBLE_QUOTES} tab, paste the embed code into the box and click ${LEFT_DOUBLE_QUOTES}SAVE${RIGHT_DOUBLE_QUOTES}. The video is now added to your Opus profile!`,
  ]
];

const copy = {
  title,
  inputPlaceholder,
  helpSectionTitle,
  helpRows,
}

const mapStateToProps = (state, props) => ({
  initialValues: {
    videos: _.sortBy(_.values(state.videos), v => v.order),
  },
  videos: _.sortBy(_.values(state.videos), v => v.order),
  profile: state.profile,
  currentValues: getFormValues(EDIT_VIDEOS)(state) || {},
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getArtistItems: VideoActions.getArtistVideos,
    updateArtistItem: VideoActions.updateArtistVideo,
    createArtistItem: VideoActions.createArtistVideo,
    destroyArtistItem: VideoActions.destroyArtistVideo,
  }, dispatch);
};

// Doesnt seem to work, since we're not using Field components
// https://redux-form.com/7.4.2/examples/syncvalidation/
const validate = values => {

  return {
    videos: validate_video_embeds(values.videos)
  };

}

let VideoEditFormBase = compose(
  reduxForm({
    form: EDIT_VIDEOS,
    validate, // <--- validation function given to redux-form
    // This allows `initialValues` to be updated below
    enableReinitialize: true,
  }),
  withStyles(styles),
  withWidth(),
)(DraggableCodeFormBase);

VideoEditFormBase = connect(mapStateToProps, mapDispatchToProps)(VideoEditFormBase);

const VideoEditForm = (props) => (
  <VideoEditFormBase itemName='videos' copy={copy} {...props} />
);

export default VideoEditForm;
