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

import { EDIT_AUDIOS } from '../../constants/forms';
import styles from './styles';
import * as AudioActions from '../../actions/audios';
import {
  LEFT_DOUBLE_QUOTES,
  RIGHT_DOUBLE_QUOTES,
} from '../../constants/unicodeCharacters';
import { validate_audio_embeds } from '../../utils/validators';

const title = 'Edit Audio';

const inputPlaceholder = 'Copy and paste audio player embed code here.';

// TODO: Use real screenshots once we have them
const helpRows = [
  [
    <img src="https://www.freeiconspng.com/uploads/no-image-icon-6.png" alt="Screenshot"/>,
    `Go to the SoundCloud page of the audio you want to add and click on the ${LEFT_DOUBLE_QUOTES}SHARE${RIGHT_DOUBLE_QUOTES} button.`,
  ], [
    <img src="https://www.freeiconspng.com/uploads/no-image-icon-6.png" alt="Screenshot"/>,
    `Select the ${LEFT_DOUBLE_QUOTES}Embed${RIGHT_DOUBLE_QUOTES} option to find the embed audio code.`
  ], [
    <img src="https://www.freeiconspng.com/uploads/no-image-icon-6.png" alt="Screenshot"/>,
    `Click inside the ${LEFT_DOUBLE_QUOTES}Code${RIGHT_DOUBLE_QUOTES} section to select all the code and right click to copy.`
  ], [
    <img src="https://www.freeiconspng.com/uploads/no-image-icon-6.png" alt="Screenshot"/>,
    `Go back to the ${LEFT_DOUBLE_QUOTES}Edit Audiod${RIGHT_DOUBLE_QUOTES} page, paste the embed code into the box and click ${LEFT_DOUBLE_QUOTES}SAVEd${RIGHT_DOUBLE_QUOTES}. The audio is now added to your Opus profile!`
  ]
];

const copy = {
  title,
  inputPlaceholder,
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

const validate = values => {

  return {
    audios: validate_audio_embeds(values.audios)
  };

}
const warn = values => {

  return {
    audios: validate_audio_embeds(values.audios)
  };

}

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

AudioEditFormBase = connect(mapStateToProps, mapDispatchToProps)(AudioEditFormBase);

const AudioEditForm = (props) => (
  <AudioEditFormBase itemName='audios' copy={copy} {...props} />
);

export default AudioEditForm;
