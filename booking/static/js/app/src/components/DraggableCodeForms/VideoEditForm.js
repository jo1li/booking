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
import FullScreenDialog from '../modal/FullScreenDialog';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import { EDIT_VIDEOS } from '../../constants/forms';
import styles from './styles';
import * as VideoActions from '../../actions/videos';
import boundToOpenElement from './boundToOpenElement';

// TODO: Use real screenshots once we have them
const helpCopyRows = [
  [
    <img src="https://www.freeiconspng.com/uploads/no-image-icon-6.png" alt="Screenshot"/>,
    'Go to the YouTube page of the video you want to add and click on the “SHARE” button.',
  ], [
    <img src="https://www.freeiconspng.com/uploads/no-image-icon-6.png" alt="Screenshot"/>,
    'Select the “Embed” option to display the embed video code.',
  ], [
    <img src="https://www.freeiconspng.com/uploads/no-image-icon-6.png" alt="Screenshot"/>,
    'Click “COPY” to copy the entire embed video code.',
  ], [
    <img src="https://www.freeiconspng.com/uploads/no-image-icon-6.png" alt="Screenshot"/>,
    'Go back to the “Embed” tab, paste the embed code into the box and click “SAVE”. The video is now added to your Opus profile!',
  ]
];

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

let VideoEditFormBase = compose(
  reduxForm({
    form: EDIT_VIDEOS,
    // This allows `initialValues` to be updated below
    enableReinitialize: true,
  }),
  withStyles(styles),
  withWidth(),
  FullScreenDialog,
)(DraggableCodeFormBase);

VideoEditFormBase = connect(mapStateToProps, mapDispatchToProps)(VideoEditFormBase);

const VideoEditForm = (props) => (
  <VideoEditFormBase itemName='videos' helpCopyRows={helpCopyRows} title='Edit Videos' {...props} />
);

export default boundToOpenElement('open-edit-videos')(VideoEditForm);
