import React, { Component } from 'react';
import { compose } from 'recompose'
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { ARTIST_ONBOARDING } from '../../constants/forms';
import {
  Field,
  reduxForm,
  getFormValues,
  SubmissionError,
} from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from './TextField';
import SelectState from '../form/SelectState';
import Button from '../form/RaisedButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';

import InputLabel from '@material-ui/core/InputLabel';

import UploadDropZone from './UploadDropZone';
import isEmpty from "lodash/isEmpty";
import FullScreenDialog from '../Dialog/FullScreenDialog';
import ProfilePhotoEditorForm from '../ProfilePhotoEditorForm';

import IconSpotify from '../ArtistCard/IconSpotify';
import IconFacebook from '../ArtistCard/IconFacebook';
import IconInstagram from '../ArtistCard/IconInstagram';
import { selectImageFile, selectImagePreview } from '../../selectors/onboardingSelectors';

import MultiSelect from '../form/MultiSelect';


import {
  updateUserBio,
  getGenres,
} from '../../request/requests';

import { MAX_BIO_SHORT_INPUT_LENGTH } from '../../constants'

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
  uploadArea: {
    width: '100%',
    borderRadius: 3,
    color: theme.palette.primary.main,
    cursor: 'pointer',
    display: 'inline-block',
    overflow: 'hidden',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
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
    '& img': {
      width: 100,
      height: 50,
      borderRadius: 2,
      backgroundColor: theme.palette.primary.light,
      MozBoxShadow:    'inset 0 0 0 1px rgba(0,0,0,0.25)',
      WebkitBoxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.25)',
      BoxShadow:       'inset 0 0 0 1px rgba(0,0,0,0.25)',
    },
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: 0,
    marginRight: 0
  },
});


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const TAGLINE_CHARS_MAX = MAX_BIO_SHORT_INPUT_LENGTH
const GENRES_MAX = 3
const imageIsRequired = value =>  {
  isEmpty(value) ? <Typography color="error">Please choose a profile photo.</Typography> : undefined;
}

const normalizeGenres = (genres) => {
  if (!genres) {
    return genres
  }
  if (Array.isArray(genres)) {
    return genres.slice(0,GENRES_MAX);
  }
}
const normalizeTagline = (tagline) => {
  if (!tagline) {
    return tagline
  } else {
    return tagline.slice(0,TAGLINE_CHARS_MAX)
  }
}

const FacebookAdornment = (
  <InputAdornment position="start">
    <IconFacebook active/>
  </InputAdornment>
)
const InstagramAdornment = (
  <InputAdornment position="start">
    <IconInstagram active/>
  </InputAdornment>
)
const SpotifyAdornment = (
  <InputAdornment position="start">
    <IconSpotify active/>
  </InputAdornment>
)

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

    const genres = values.genres ? values.genres.map(g => g.value).join(",") : "";
    const data = Object.assign({}, values, {
      genres: genres,
      image: imageFile
    });

    const errors = {}

    // tagline validation
    if(!data.bio_short) {
      errors.bio_short = "This field is required.";
    }

    // image validation
    if(!data.image) {
      errors.image = "Please add a profile photo.";
    }

    // genres validation
    if(_.isEmpty(data.genres)) {
      errors.genres = "Please select at least 1 genre.";
    }

    // url regex
    const simple_url_regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/){1}[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,25}(:[0-9]{1,5})?(\/.*)?$/;

    // website validation
    if (data.website && !simple_url_regex.test(data.website)) {
      errors.website = "This link looks invalid. Please make sure the link starts with http:// or https://";
    }

    const urlerror = "This link looks invalid. Please check for typos and make sure the link starts with https://";

    // facebook validation
    if (data.facebook && data.facebook.indexOf('facebook.com') === -1) {
      errors.facebook = "Please use a Facebook link here."
    } else if (data.facebook && !simple_url_regex.test(data.facebook)) {
      errors.facebook = urlerror;
    }

    // instagram validation
    if (data.instagram && data.instagram.indexOf('instagram.com') === -1) {
      errors.instagram = "Please use an Instagram link here."
    } else if (data.instagram && !simple_url_regex.test(data.instagram)) {
      errors.instagram = urlerror;
    }

    // spotify validation
    if (data.spotify && data.spotify.indexOf('spotify.com') === -1) {
      errors.spotify = "Please use a Spotify link here."
    } else if (data.spotify && !simple_url_regex.test(data.spotify)) {
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
        onClickConfirm={file => change('image', file)}
      />
    )
  }

  render() {
    const { classes, pristine, submitting, handleSubmit, currentValues, imagePreview, invalid } = this.props
    const requiredEmpty = _.isEmpty(currentValues.genres) || !currentValues.image || !currentValues.bio_short ? true : false;
    const genresForSelect = this.state.genres.map(g => ({
      value: g,
      label: g
    }));

    return (
      <React.Fragment>
        <CssBaseline/>
        <main className={classes.layout}>
          <Typography variant="headline" align="center">Onboarding</Typography>
          <Paper className={classes.paper}>
            <form className={classes.form} onSubmit={handleSubmit(this.submit)}>
              <FormControl margin="normal" className={classes.uploadArea} fullWidth>
                <Field
                  name="image"
                  component={UploadDropZone}
                  type="file"
                  imagefile={currentValues.image}
                  handleOnDrop={this.openPhotoEditor}
                  validate={[imageIsRequired]}
                />
                <FormHelperText style={{ marginLeft: '4px'}}>Required</FormHelperText>
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Field
                  name="bio_short"
                  label="Tagline"
                  multiline={true}
                  maxLength={MAX_BIO_SHORT_INPUT_LENGTH}
                  component={TextField}
                  normalize={normalizeTagline}
                />
                <FormHelperText>Required • {`Up to ${MAX_BIO_SHORT_INPUT_LENGTH} characters long`}</FormHelperText>
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Field
                  name="genres"
                  label="Genres"
                  isMulti
                  component={MultiSelect}
                  options={genresForSelect}
                  helpText="Required • Select up to three."
                  normalize={normalizeGenres}
                >
                </Field>
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Field
                  name="website"
                  label="Your Website"
                  placeholder="http://"
                  component={TextField}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Field
                  name="facebook"
                  label="Facebook Page"
                  placeholder="https://"
                  component={TextField}
                  InputProps = {{
                    startAdornment: FacebookAdornment
                  }}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Field
                  name="instagram"
                  label="Instagram Profile"
                  placeholder="https://"
                  component={TextField}
                  InputProps = {{
                    startAdornment: InstagramAdornment
                  }}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Field
                  name="spotify"
                  label="Spotify Artist Page"
                  placeholder="https://"
                  component={TextField}
                  InputProps = {{
                    startAdornment: SpotifyAdornment
                  }}
                />
              </FormControl>
              <Grid container spacing={16}>
                <Grid item style={{flexGrow: 1}}>
                  <FormControl margin="normal" fullWidth>
                    <Field
                      name="hometown"
                      label="City"
                      component={TextField}
                    />
                  </FormControl>
                </Grid>
                <Grid item className={classes.state}>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="state">State</InputLabel>
                    <Field
                        component={SelectState}
                        id="state"
                        label="State"
                        name="state"
                        placeholder=""
                        type="select"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                disabled={requiredEmpty || submitting}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create your profile
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
  FullScreenDialog,
)(OnboardingForm);
