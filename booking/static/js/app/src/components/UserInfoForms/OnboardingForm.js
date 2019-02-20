import React, { Component } from 'react';
import { compose } from 'recompose'
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { ARTIST_ONBOARDING } from '../../constants/forms';
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

import Button from '../form/RaisedButton';
import Dialog from '../Dialog/Dialog';
import ProfilePhotoEditorForm from '../ProfilePhotoEditorForm';
import { UserInfoFormSection, ProfilePhotoFormSection } from './formSections';

import { selectImageFile, selectImagePreview } from '../../selectors/onboardingSelectors';

import validator from 'validator';

import {
  updateUserBio,
  getGenres,
} from '../../request/requests';

const validatorOptions = {
  protocols: ['http','https'],
  require_protocol: true,
  disallow_auth: true
}

const validateURL = (url) => {
  return validator.isURL(url, validatorOptions);
}

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: theme.spacing.unit * 5,
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  genreLabel: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.54)',
    paddingBottom: theme.spacing.unit/2,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  state: {
    minWidth: 110,
    width: 'auto',
    maxWidth: '100%',
  },
  city: {
    maxWidth: '100%',
  },
  fullWidthShrunkLabel: {
    width: 'calc(100% * 4/3)', // Because the label is scaled down to 75%. All ears for better ideas.
  },
  splitLabel: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  textCount: {
    ...theme.palette.overline,
    transform: 'scale(0.75)', // Lives next to a label shrunk to 75% normal size
    color: theme.palette.grey[500],
  },
  uploadArea: {
    width: '100%',
    borderRadius: 3,
    color: theme.palette.primary.main,
    cursor: 'pointer',
    display: 'inline-block',
    overflow: 'hidden',
    '& ul li': {
      margin: 0,
      padding: `${theme.spacing.unit/2}px`,
      listStyleType: 'none',
      lineHeight: '0px',
    },
    '& ul': {
      margin: 0,
      padding: 0,
    },
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    ...theme.typography.button,
    color: 'white',
    marginTop: theme.spacing.unit * 3,
    marginLeft: 0,
    marginRight: 0,
    // TODO: Should not have to overwrite radius in RaisedButton
    borderRadius: 2,
  },
  caption: {
    color: theme.palette.grey[600],
  },
  label: theme.typography.overline,
  textInput: theme.typography.body1,
  error: {
    ...theme.typography.caption,
    color: 'red',
  }
});

class OnboardingForm extends Component {
  constructor() {
    super();

    autoBind(this);
  }

  state = {
    genres: [],
  }

  componentWillMount() {
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

          if (res.data.url_fq) {
            window.location.href = res.data.url_fq
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
          change('image', file);
        }}
      />
    )
  }

  render() {
    const { classes, submitting, handleSubmit, currentValues, change } = this.props
    // Not currently requiring image.
    const requiredEmpty = _.isEmpty(currentValues.genres) || !currentValues.bio_short ? true : false;
    const genresForSelect = this.state.genres.map(g => ({
      value: g,
      label: g
    }));

    return (
      <React.Fragment>
        <CssBaseline/>
        <main className={classes.layout}>
          <Typography variant="h6" align="center">Create your profile</Typography>
          <Paper className={classes.paper}>
            <form className={classes.form} onSubmit={handleSubmit(this.submit)}>
              <ProfilePhotoFormSection classes={classes} currentValues={currentValues} openPhotoEditor={this.openPhotoEditor} />
              <UserInfoFormSection classes={classes} currentValues={currentValues} change={change} genresForSelect={genresForSelect}/>
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
  getGenres: getGenres,
  musicianId: props.musicianId,
  imageFile: selectImageFile(state),
  imagePreview: selectImagePreview(state),
})

// Pulling this out of compose helps initialValues behave correctly.
//  https://stackoverflow.com/a/47475674/103315
OnboardingForm = reduxForm({
  form: ARTIST_ONBOARDING,
})(OnboardingForm)

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  Dialog,
)(OnboardingForm);
