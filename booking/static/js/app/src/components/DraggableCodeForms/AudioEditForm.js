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

const soundcloudHelpRows = [
  [
    <img src="https://res.cloudinary.com/opus-dev/image/upload/v1/media/soundcloud-help-image-1_fad5ul" alt="Screenshot"/>,
    <Fragment>
      Click the <strong>Share</strong> option on the Soundcloud audio track.
    </Fragment>,
  ], [
    <img src="https://res.cloudinary.com/opus-dev/image/upload/v1/media/soundcloud-help-image-2_bymqkc" alt="Screenshot"/>,
    <Fragment>Select the <strong>Embed</strong> option.</Fragment>,
  ], [
    <img src="https://res.cloudinary.com/opus-dev/image/upload/v1/media/soundcloud-help-image-3_xs1wx8" alt="Screenshot"/>,
    <Fragment>Copy the Embed Code.</Fragment>,
  ], [
    <img src="https://res.cloudinary.com/opus-dev/image/upload/v1/media/soundcloud-help-image-4_pqnrra" alt="Screenshot"/>,
    <Fragment>Paste the Embed Code into the Opus embed field.</Fragment>,
  ]
];

const spotifyHelpRows = [
  [
    <img src="https://res.cloudinary.com/opus-dev/image/upload/v1/media/spotify-help-image-1_w3g3rw" alt="Screenshot"/>,
    <Fragment>
      Click the <strong>More</strong> option on a Spotify track.
    </Fragment>,
  ], [
    <img src="https://res.cloudinary.com/opus-dev/image/upload/v1/media/spotify-help-image-2_bbhjse" alt="Screenshot"/>,
    <Fragment>Select the <strong>Share</strong> menu option.</Fragment>,
  ], [
    <img src="https://res.cloudinary.com/opus-dev/image/upload/v1/media/spotify-help-image-3_bp5loy" alt="Screenshot"/>,
    <Fragment>Click <strong>Copy Embed Code</strong>.</Fragment>,
  ], [
    <img src="https://res.cloudinary.com/opus-dev/image/upload/v1/media/spotify-help-image-4_sdpng4" alt="Screenshot"/>,
    <Fragment>Paste the Embed Code into the Opus embed field.</Fragment>,
  ]
];

const copy = {
  title,
  inputPlaceholder,
  helpSections: [
    {
      title: 'Soundcloud Help',
      helpRows: soundcloudHelpRows,
    }, {
      title: 'Spotify Help',
      helpRows: spotifyHelpRows,
    }
  ],
  gettingStarted: {
    howTo: `To add an audio track, copy and paste the embed code from a Spotify or Soundcloud track below.`,
    example: `<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https%3A//api.soundcloud.com/tracks/34839210&visual=true"></iframe>`,
    showHelpLink: false,
  },
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
