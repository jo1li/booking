import React, { Component } from 'react';
import { compose } from 'recompose'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';
import { ARTIST_ONBOARDING } from '../constants/forms';
import {
  reduxForm,
  getFormValues,
  SubmissionError,
} from 'redux-form';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

import Button from './form/RaisedButton';
import Dialog from './Dialog/Dialog';
import ProfilePhotoEditorForm from './ProfilePhotoEditorForm';
import { ArtistInfoFormSection, ProfilePhotoFormSection } from './ArtistInfoFormSections';

import validator from 'validator';
import { updateUserBio } from '../request/requests';
import * as GenreActions from '../actions/genres';
import styles from '../sharedStyles/artistInfoFormsStyles.js';

const validatorOptions = {
  protocols: ['http','https'],
  require_protocol: true,
  disallow_auth: true
}

const validateURL = (url) => {
  return validator.isURL(url, validatorOptions);
}

class OnboardingForm extends Component {
  constructor() {
    super();

    autoBind(this);
  }

  componentWillMount() {
    this.props.getGenres();
  }

  submit = async (values) => {
    const { updateUserBio, musicianid } = this.props;

    const genres = values.genres ? values.genres.map(g => `"${g.value}"`).join(",") : "";
    let data = { ...values, genres }

    try {
      const res = await updateUserBio(data, musicianid);
      if (res.data.url_fq) {
        window.location.href = res.data.url_fq;
      }
    } catch(errors) {
      console.error('Error in OnboardingForm submit', errors);
    };

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
        onClickConfirm={file => change('image', file) } />
    )
  }

  render() {
    const { classes, submitting, handleSubmit, currentValues, change, genres } = this.props
    // Not currently requiring image.
    const requiredEmpty = _.isEmpty(currentValues.genres) || !currentValues.bio_short ? true : false;
    const genresForSelect = _.map(genres, genre => ({
      value: genre.name,
      label: genre.name
    }));

    return (
      <React.Fragment>
        <CssBaseline/>
        <main className={classes.layout}>
          <Typography variant="h6" align="center">Create your profile</Typography>
          <Paper className={classes.paper}>
            <form className={classes.form} onSubmit={handleSubmit(this.submit)}>
              <ProfilePhotoFormSection classes={classes} currentValues={currentValues} openPhotoEditor={this.openPhotoEditor} />
              <ArtistInfoFormSection classes={classes} currentValues={currentValues} change={change} genresForSelect={genresForSelect}/>
              <Button
                type="submit"
                disabled={requiredEmpty || submitting}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {'Save & view your profile'}
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  initialValues: { hometown: "New York", state: "NY" },
  currentValues: getFormValues(ARTIST_ONBOARDING)(state) || {},

  // TODO this should go into bindActionCreators and be used as an action
  updateUserBio: updateUserBio,
  musicianId: props.musicianId,

  // TODO: better way to do this?
  image: { preview: props.image, isFile: true, name: 'image.jpg' },

  genres: state.genres,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getGenres: GenreActions.getGenres,
  }, dispatch);
};

// Pulling this out of compose helps initialValues behave correctly.
//  https://stackoverflow.com/a/47475674/103315
OnboardingForm = reduxForm({
  form: ARTIST_ONBOARDING,
})(OnboardingForm);

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  Dialog,
)(OnboardingForm);
