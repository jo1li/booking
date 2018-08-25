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

import { EDIT_AUDIOS } from '../../constants/forms';
import styles from './styles';
import * as AudioActions from '../../actions/audios';
import boundToOpenElement from './boundToOpenElement';

// TODO: use the audio copy once we have it
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
    audios: _.sortBy(_.values(state.audios), v => v.order),
  },
  audios: _.sortBy(_.values(state.audios), v => v.order),
  profile: state.profile,
  currentValues: getFormValues(EDIT_AUDIOS)(state) || {},
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getArtistItems: AudioActions.getArtistAudios,
    updateArtistItem: AudioActions.updateArtistAudio,
    createArtistItem: AudioActions.createArtistAudio,
    destroyArtistItem: AudioActions.destroyArtistAudio,
  }, dispatch);
};

let AudioEditFormBase = compose(
  reduxForm({
    form: EDIT_AUDIOS,
    // This allows `initialValues` to be updated below
    enableReinitialize: true,
  }),
  withStyles(styles),
  withWidth(),
  FullScreenDialog,
)(DraggableCodeFormBase);

AudioEditFormBase = connect(mapStateToProps, mapDispatchToProps)(AudioEditFormBase);

const AudioEditForm = (props) => (
  <AudioEditFormBase itemName='audios' helpCopyRows={helpCopyRows} title='Edit Audio' {...props} />
);

export default boundToOpenElement('open-edit-audios')(AudioEditForm);
