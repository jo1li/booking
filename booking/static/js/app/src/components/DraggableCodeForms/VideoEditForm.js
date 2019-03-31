// TODO: This can be DRYed up a little bit more with AudioEditForm, but want
//       to wait until DRYing up with other modals so we don't abstract at wrong
//       level and make more work for ourselves
import React, { Fragment } from 'react';
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
import CONFIGS from '../../configs';

const title = 'Edit YouTube Video Embeds';

const inputLabel = 'YouTube Embed';
const inputPlaceholder = 'Paste an embed code from YouTube';

const helpRows = [
  [
    <img src={`${CONFIGS.IMAGES_URL}/embed-help-screenshots/youtube-help-1.png`} alt="Screenshot"/>,
    <Fragment>
      Click the <strong>Share</strong> option on the YouTube video.
    </Fragment>,
  ], [
    <img src={`${CONFIGS.IMAGES_URL}/embed-help-screenshots/youtube-help-2.png`} alt="Screenshot"/>,
    <Fragment>Select the <strong>Embed</strong> option.</Fragment>,
  ], [
    <img src={`${CONFIGS.IMAGES_URL}/embed-help-screenshots/youtube-help-3.png`} alt="Screenshot"/>,
    <Fragment>Copy the Embed Code.</Fragment>,
  ], [
    <img src={`${CONFIGS.IMAGES_URL}/embed-help-screenshots/youtube-help-4.png`} alt="Screenshot"/>,
    <Fragment>Paste the Embed Code into the Opus embed field.</Fragment>,
  ]
];

const copy = {
  title,
  inputLabel,
  inputPlaceholder,
  helpSections: [
    {
      title: 'Help',
      helpRows,
    }
  ],
  gettingStarted: {
    mobileHowTo: "We're still ironing out the kinks on mobile devices. For the best experience, add videos on a laptop or desktop computer.",
    howTo: `To get started, find a YouTube video, hit the Share button, and then look for the ${LEFT_DOUBLE_QUOTES}Embed${RIGHT_DOUBLE_QUOTES} option. Paste the embed code below.`,
    example: `<iframe width="560" height="315" src="https://www.youtube.com/embed/0he7sPQ7xwE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    showHelpLink: true,
  },
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

const validate = values => {

  return {
    videos: validate_video_embeds(values.videos)
  };

}
const warn = values => {

  return {
    videos: validate_video_embeds(values.videos)
  };

}

let VideoEditFormBase = compose(
  reduxForm({
    form: EDIT_VIDEOS,
    // The form fields will not be validated until they are 'touched'
    // this sets touched to true so they are validate always
    // https://github.com/erikras/redux-form/blob/master/src/createReduxForm.js#L289
    touchOnChange: true,
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
