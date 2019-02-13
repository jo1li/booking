import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Field,
  reduxForm,
  getFormValues,
  SubmissionError,
} from 'redux-form';
import autoBind from 'react-autobind';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash'

import CancelConfirm from '../CancelConfirm';
import { Caption, Display1 } from '../typography';

import InputButtons from './InputButtons';
import {
  DeleteButton,
  AddButton,
} from '../form/FabButton';

import { selectImageFile, selectImagePreview } from '../../selectors/onboardingSelectors';

import ModalHeader from '../ModalHeader';
import Input from '../form/Input';
import Select from '../form/Select';
import TextArea from '../form/TextArea';
import TextField from '@material-ui/core/TextField';
import SelectState from '../form/SelectState';
import ImageUploadContainer from './ImageUploadContainer';
import TextCount from '../form/TextCount';
import UserInfoForm from '../UserInfoForm';
import {
  validateURL,
  validateMaxLength,
} from '../../utils/validators';

import { EDIT_BASIC_INFO, MAX_BIO_SHORT_INPUT_LENGTH } from '../../constants'

import {
  updateUserBio,
  getGenres,
} from '../../request/requests';
import styles from './styles';

import Dialog from '../Dialog/Dialog';
import ProfilePhotoEditorForm from '../ProfilePhotoEditorForm';


// NB: Don't define this in the prop value; it won't work the way you expect.
const validateTaglineMaxLength = validateMaxLength(MAX_BIO_SHORT_INPUT_LENGTH);

class UserEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
    }

    autoBind(this);
  }

  componentWillMount() {

    // TODO MOVE THIS! this is not the correct way to get data
    this.props.getGenres().then(res => {
      this.setState({
        genres: res.data.results.map(result => result.name)
      })
    })
  }

  submit = async (values) => {
    const { updateUserBio, musicianid, imageFile } = this.props;

    const genres = values.genres ? values.genres.map(g => `"${g.value}"`).join(",") : "";
    let data = { ...values, genres: genres }
    if(!_.isEmpty(imageFile)) {
      data = { ...data, image: imageFile }
    }

    const errors = {}

    // tagline validation
    if(!data.bio_short) {
      errors.bio_short = "This field is required.";
    }

    // genres validation
    if(_.isEmpty(data.genres)) {
      errors.genres = "Please select at least 1 genre.";
    }

    // url regex
    const simple_url_regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/){1}[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,25}(:[0-9]{1,5})?(\/.*)?$/;

    // website validation
    if (data.website && !simple_url_regex.test(data.website)) {
      errors.website = "This link looks invalid. Please make sure the link starts with http:// or https://";
    }

    const urlerror = "This link looks invalid. Please check for typos and make sure the link starts with https://";

    // facebook validation
    if (data.facebook && data.facebook.toLowerCase().indexOf('facebook.com') === -1) {
      errors.facebook = "Please use a Facebook link here."
    } else if (data.facebook && !validateURL(data.facebook)) {
      errors.facebook = urlerror;
    }

    // instagram validation
    if (data.instagram && data.instagram.toLowerCase().indexOf('instagram.com') === -1) {
      errors.instagram = "Please use an Instagram link here."
    } else if (data.instagram && !validateURL(data.instagram)) {
      errors.instagram = urlerror;
    }

    // spotify validation
    if (data.spotify && data.spotify.toLowerCase().indexOf('spotify.com') === -1) {
      errors.spotify = "Please use a Spotify link here."
    } else if (data.spotify && !validateURL(data.spotify)) {
      errors.spotify = urlerror;
    }

    if(Object.keys(errors).length === 0) {

       try {
          const res = await updateUserBio(data, musicianid);

          if(res.status === 200) {
            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
          }

        } catch(errors) {
          console.error('Error in OnboardingForm submit', errors);
        };
    } else {
      throw new SubmissionError(errors);
    }

  }

  openPhotoEditor(imageFile) {
    const {
      change,
      openDialog,
    } = this.props;

    openDialog(
      <ProfilePhotoEditorForm
        image={imageFile.preview}
        imageName={imageFile.name}
        onClickConfirm={file => {
          change('image', file.preview);
          change('imageFile', file);
        }} />
    )
  }

  render() {
    const {
        closeDialog,
        change,
        submitting,
        handleSubmit,
        currentValues,
        submitSucceeded,
        classes,
        valid,
    } = this.props;

    const {
      genres
    } = this.state;


    return (
      <div className={`${classes.container} ${classes.withFooter}`}>
        <ModalHeader classes={classes}>Edit Your Info</ModalHeader>
        <UserInfoForm oneColumn={false} currentValues={currentValues} openPhotoEditor={this.openPhotoEditor} />
        <CancelConfirm
            onClickCancel={closeDialog}
            onClickConfirm={handleSubmit(this.submit)}
            isLoading={submitting}
            disabled={!valid}
            success={submitSucceeded}
            className={classes.footer}
        />
      </div>
    );
  }
}

// TODO these can probably be combined
UserEditForm = withStyles(styles)(UserEditForm)

UserEditForm = reduxForm({
  form: EDIT_BASIC_INFO,
})(UserEditForm);

const mapStateToProps = (state, props) => ({
  // TODO add defaults value function
  initialValues: {
    stage_name: props.stage_name,
    image: props.image,
    facebook: props.facebook,
    instagram: props.instagram,
    spotify: props.spotify,
    hometown: props.hometown || "New York",
    genres: props.genres.map(g => ({value: g.name, label: g.name})),
    state: props.state || "NY",
    website: props.website,
    bio_short: props.bio_short,
  },
  // initialValues: { hometown: "New York", state: "NY" },
  currentValues: getFormValues(EDIT_BASIC_INFO)(state) || {},
  // formValues: getFormValues(ARTIST_ONBOARDING)(state), // TODO: use different form name

  // TODO this should go into bindActionCreators and be used as an action
  updateUserBio: updateUserBio,
  getGenres: getGenres,
  musicianId: props.id,

  updateUserBio: updateUserBio,
  musicianid: props.id,
  imageFile: selectImageFile(state),
})

export default compose(
  connect(mapStateToProps),
  Dialog,
)(UserEditForm);
