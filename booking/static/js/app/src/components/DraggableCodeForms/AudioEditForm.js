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
import {
  LEFT_DOUBLE_QUOTES,
  RIGHT_DOUBLE_QUOTES,
} from '../../constants/unicodeCharacters';

const title = 'Edit Audio';

const inputPlaceholder = 'Copy and paste audio player embed code here.';

const helpSectionTitle = 'How to embed audio';

// TODO: Use audio copy and real screenshots once we have them
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
  <AudioEditFormBase itemName='audios' copy={copy} {...props} />
);

export default boundToOpenElement('open-edit-audios')(AudioEditForm);
