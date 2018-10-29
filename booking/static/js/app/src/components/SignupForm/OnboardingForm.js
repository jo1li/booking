import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import SelectField from './SelectField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '../form/RaisedButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';

import InputLabel from '@material-ui/core/InputLabel';

import UploadDropZone from './UploadDropZone';
import isEmpty from "lodash/isEmpty";

import IconSpotify from '../ArtistCard/IconSpotify';
import IconFacebook from '../ArtistCard/IconFacebook';
import IconInstagram from '../ArtistCard/IconInstagram';

import {
  updateUserBio,
  getGenres,
} from '../../request/requests';

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

const TAGLINE_CHARS_MAX = 60
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

  state = {
    genres: [],
    imageFile: {},
  }

  componentWillMount() {
    this.props.getGenres().then(res => {
      this.setState({
        genres: res.data.results.map(result => result.name)
      })
    })
  }

  submit = (values) => {
    const { updateUserBio, musicianid, stagename } = this.props;
    const data = Object.assign({}, values, {
      genres: values.genres,
      image: _.get(values, 'image.0'),
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
    const simple_url_regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,25}(:[0-9]{1,5})?(\/.*)?$/;
    
    // website validation
    if (data.website && !simple_url_regex.test(data.website)) {
      errors.website = "This link looks invalid. Please check for typos.";
    }

    // facebook validation
    if (data.facebook.indexOf('facebook.com') > -1) {
      errors.facebook = "Please use a Facebook link here."
    } else if (data.facebook && !simple_url_regex.test(data.facebook)) {
      errors.facebook = "This link looks invalid. Please check for typos.";
    }

    // instagram validation
    if (data.instagram.indexOf('instagram.com') > -1) {
      errors.facebook = "Please use an Instagram link here."
    } else if (data.instagram && !simple_url_regex.test(data.instagram)) {
      errors.instagram = "This link looks invalid. Please check for typos.";
    }

    // spotify validation
    if (data.spotify.indexOf('spotify.com') > -1) {
      errors.spotify = "Please use a Spotify link here."
    } else if (data.spotify && !simple_url_regex.test(data.spotify)) {
      errors.spotify = "This link looks invalid. Please check for typos.";
    }
    

    if(Object.keys(errors).length === 0) {
      return updateUserBio(data, musicianid).then(res => {
        if(res.status === 200) {
          if(res.data.url_fq) {
            window.location.href = res.data.url_fq
          } else {
            // uhhh
          }
        }
      })
      .catch(error => {
        if (error.response.data) {
          throw new SubmissionError(error.response.data);
          // TODO: this should mark form as invalid so submit button is disabled
        }
      });
    } else {
      throw new SubmissionError(errors);
    }

  }

  handleFileDrop = newImageFile => {
    this.setState({ imageFile: newImageFile })
  }

  render() {
    const { classes, pristine, submitting, handleSubmit, currentValues, invalid } = this.props
    const requiredEmpty = _.isEmpty(currentValues.genres) || !currentValues.image || !currentValues.bio_short ? true : false;
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
                  imagefile={this.state.imageFile}
                  handleOnDrop={this.handleFileDrop}
                  validate={[imageIsRequired]}
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Field
                  name="bio_short"
                  label="Tagline"
                  multiline={true}
                  maxLength="60"
                  component={TextField}
                  normalize={normalizeTagline}
                />
                <FormHelperText>Required • Up to 60 characters long</FormHelperText>
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Field
                  name="genres"
                  component={SelectField}
                  label="Genres"
                  multiple
                  format={value => value || []}
                  normalize={normalizeGenres}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {this.state.genres.map(genre => (
                    <MenuItem key={genre} value={genre}>
                      <Checkbox checked={currentValues.genres ? currentValues.genres.indexOf(genre) > -1 : false} />
                      <ListItemText>{genre}</ListItemText>
                    </MenuItem>
                  ))}
                </Field>
                <FormHelperText>Required • Select up to three.</FormHelperText>
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
                disabled={requiredEmpty || invalid || pristine || submitting}
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

OnboardingForm = withStyles(styles)(OnboardingForm)

OnboardingForm = reduxForm({
  form: ARTIST_ONBOARDING,
})(OnboardingForm);

const mapStateToProps = (state, props) => ({
  initialValues: { hometown: "New York", state: "NY" },
  currentValues: getFormValues(ARTIST_ONBOARDING)(state) || {},

  // TODO this should go into bindActionCreators and be used as an action
  updateUserBio: updateUserBio,
  getGenres: getGenres,
  musicianId: props.musicianId,
  stagename: props.stage_name,
})

export default connect(mapStateToProps)(OnboardingForm);
