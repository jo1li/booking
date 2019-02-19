import React, { Component } from 'react';
import { compose } from 'recompose'
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import {
  Field,
} from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from './SignupForm/TextField';
import SelectState from './form/SelectState';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormControl from '@material-ui/core/FormControl';

import InputLabel from '@material-ui/core/InputLabel';

import UploadDropZone from './SignupForm/UploadDropZone';
import Dialog from './Dialog/Dialog';
import ProfilePhotoEditorForm from './ProfilePhotoEditorForm';
import TextCount from './form/TextCount';

import IconSpotify from './ArtistCard/IconSpotify';
import IconFacebook from './ArtistCard/IconFacebook';
import IconInstagram from './ArtistCard/IconInstagram';
import { selectImageFile, selectImagePreview } from '../selectors/onboardingSelectors';

import MultiSelect from './form/MultiSelect';

import {
  validateMaxLength,
} from '../utils/validators';

import withWidth from '@material-ui/core/withWidth';

// import { Scrollbars } from 'react-custom-scrollbars';
// import ShadowScrollbar from './HOComponents/ShadowScrollbar';
// import ScrollShadow from 'react-scroll-shadow';

import {
  updateUserBio,
  getGenres,
} from '../request/requests';

import { MAX_BIO_SHORT_INPUT_LENGTH } from '../constants'

// const validatorOptions = {
//   protocols: ['http','https'],
//   require_protocol: true,
//   disallow_auth: true
// }

// const validateURL = (url) => {
//   return validator.isURL(url, validatorOptions);
// }

// NB: Don't define this in the prop value; it won't work the way you expect.
const validateTaglineMaxLength = validateMaxLength(MAX_BIO_SHORT_INPUT_LENGTH);

const formatSocialURL = ({ urlBase, fieldName, currentValues, change }) => {
  const url = currentValues[fieldName];
  if(!url) return;
  // Consider the word characters after the last slash to be the username
  const re = /^(?:.*\/)?(\w+)$/;
  const formattedUrl = url.replace(re, (match, username) => {
    return `${urlBase}/${username}`;
  });
  change(fieldName, formattedUrl);
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
  splitLabel: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  textCount: {
    ...theme.palette.overline,
    color: theme.palette.grey[600],
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
  textInput: {
    ...theme.typography.body1,
    opacity: 1,
    '&::placeholder': {
      opacity: 1,
      color: theme.palette.grey[500],
    },
  },
  placeholder: {
    ...theme.typography.body1,
    color: theme.palette.grey[500],
  },
  label: {
    ...theme.typography.overline,
    transform: 'none', // Overwrite material-ui shrinking behavior
    color: theme.palette.grey[800],
  },
  error: {
    ...theme.typography.caption,
    color: 'red',
  },
  scrollMeMore: {
    maxHeight: '100%', // for some reason doesn't work with just height
    overflowY: 'scroll',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 3 / 2, // To eat the negative margin in the grids
    }
  }
});

const GENRES_MAX = 3
// Not currently requiring avatar in onboarding.
// const imageIsRequired = value =>  {
//   isEmpty(value) ? <Typography color="error">Please choose a profile photo.</Typography> : undefined;
// }

const normalizeGenres = (genres) => {
  if (!genres) {
    return genres
  }
  if (Array.isArray(genres)) {
    return genres.slice(0,GENRES_MAX);
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
    distanceFromTop: 0,
    // Just any number large enough to ensure the bototm shadow shows on load
    // Banking on this modal being tall enough to have scrolling
    distanceFromBottom: 100,
  }

  componentWillMount() {
    this.props.getGenres().then(res => {
      this.setState({
        genres: res.data.results.map(result => result.name),
        // TODO: handle container too tall vs not too tall
      })
    })
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

  // TODO: move this into an HOC
  toggleScrollShadows(event) {
    if(!this.refs.scrollableContainerWithShadows) {
      return;
    }

    this.setState({
      distanceFromTop: this.refs.scrollableContainerWithShadows.scrollTop,
      distanceFromBottom: this.refs.scrollableContainerWithShadows.scrollHeight - (this.refs.scrollableContainerWithShadows.scrollTop + this.refs.scrollableContainerWithShadows.offsetHeight),
    });

  }

  render() {
    const { classes, currentValues, change, width } = this.props;

    // Not currently requiring image.
    // TODO: remember this is important in onboarding form
    // const requiredEmpty = _.isEmpty(currentValues.genres) || !currentValues.bio_short ? true : false;
    const genresForSelect = this.state.genres.map(g => ({
      value: g,
      label: g
    }));

    return (
      <form className={classes.form} style={{overflow: 'hidden', display: 'flex', position: 'relative', flexGrow: 1, marginTop: 0}}>
      { width !== 'xs' ?
        <Grid container direction='column' spacing={24} style={{position: 'absolute', left: 0, top: 0}}>
          <Grid item xs={12} sm={4}>
            <FormControl margin="normal" className={classes.uploadArea} fullWidth>
              <Field
                name="image"
                component={UploadDropZone}
                label={currentValues.image ? 'Change' : 'Add Photo'}
                type="file"
                image={currentValues.imageFile || {preview: currentValues.image, name: 'image.jpg'}}
                handleOnDrop={this.openPhotoEditor}
              />
            </FormControl>
          </Grid>
        </Grid> :
        null
      }

        <div className={classes.scrollMeMore} ref='scrollableContainerWithShadows' onScroll={this.toggleScrollShadows}>
          <div style={{zIndex: 100, position: 'absolute', backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.08))', top: Math.min(this.state.distanceFromTop - 10, 0), left: 0, right: 0, height: '10px'}} />

          { width === 'xs' ?
              <Grid item xs={12} sm={4} style={{ marginTop: 16 }}>
                <FormControl margin="normal" className={classes.uploadArea} fullWidth>
                  <Field
                    name="image"
                    component={UploadDropZone}
                    label={currentValues.image ? 'Change' : 'Add Photo'}
                    type="file"
                    image={currentValues.imageFile || {preview: currentValues.image, name: 'image.jpg'}}
                    handleOnDrop={this.openPhotoEditor}
                  />
                </FormControl>
              </Grid> :
            null
          }

          <Grid container direction='row' spacing={width === 'xs' ? 0 : 24}>
            <Grid item xs={0} sm={4}/>
            <Grid item xs={12} sm={8} style={{padding: width === 'xs' ? '0 24px' : '16px 36px 0 0'}}>
              <FormControl margin="normal" fullWidth>
                <TextCount
                    inline={true}
                    className={classes.textCount}
                    maxLength={MAX_BIO_SHORT_INPUT_LENGTH}
                    currentLength={_.get(currentValues, 'bio_short', []).length } >
                  <Field
                    name="bio_short"
                    label={'Tagline'}
                    multiline={true}
                    maxLength={MAX_BIO_SHORT_INPUT_LENGTH}
                    component={TextField}
                    validate={[validateTaglineMaxLength]}
                    placeholder='Tagline'
                    errorClassName={classes.error}
                    helpText={<Typography variant="caption" className={classes.caption}>Required</Typography>}
                    InputLabelProps={{
                      classes: {
                        root: classes.placeholder,
                        shrink: classes.label,
                      },
                      className: classes.splitLabel,
                    }}
                    InputProps={{
                      classes: {
                        root: classes.textInput,
                        input: classes.textInput
                      }
                    }}
                    fullWidth
                  />
                </TextCount>
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Field
                  name="genres"
                  label="Genres"
                  isMulti
                  component={MultiSelect}
                  options={genresForSelect}
                  helpText={<Typography variant="caption" className={classes.caption}>Required • Select up to three.</Typography>}
                  normalize={normalizeGenres}
                  InputLabelProps={{
                    classes: { shrink: classes.label },
                    shrink: true,
                  }}
                >
                </Field>
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Field
                  name="website"
                  label='Website'
                  placeholder="http://www.example.com"
                  component={TextField}
                  InputLabelProps={{
                    shrink: true,
                    classes: { shrink: classes.label },
                  }}
                  InputProps={{
                    classes: {
                      input: classes.textInput
                    }
                  }}
                  onBlur={
                    (e) => {
                      const url = currentValues.website;
                      if(!url) return;
                      const re = /^(.*:\/\/)?(.*)$/;
                      const formattedUrl = url.replace(re, (match, protocolPrefix, rest) => {
                        return `${protocolPrefix || 'http://'}${rest}`;
                      });
                      change('website', formattedUrl);
                      e.preventDefault();
                    }
                  }
                />
              </FormControl>
              <Grid container spacing={16}>
                <Grid item style={{flexGrow: 1}}>
                  <FormControl margin="normal" fullWidth>
                    <Field
                      name="hometown"
                      label="City"
                      component={TextField}
                      InputLabelProps={{
                        shrink: true,
                        classes: { shrink: classes.label },
                      }}
                      InputProps={{
                        classes: {
                          input: classes.textInput
                        }
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item className={classes.state}>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="state" className={classes.label}>
                      <Typography variant="overline">State</Typography>
                    </InputLabel>
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
              <FormControl margin="normal" fullWidth style={{marginTop: 56}}>
                <Field
                  name="facebook"
                  label="Facebook Link"
                  placeholder="https://facebook.com/page"
                  component={TextField}
                  InputProps = {{
                    startAdornment: FacebookAdornment,
                    classes: {
                      input: classes.textInput
                    }
                  }}
                  InputLabelProps={{
                    shrink: true,
                    classes: { shrink: classes.label },
                  }}
                  onBlur={
                    (e) => {
                      formatSocialURL({
                        urlBase: 'https://facebook.com',
                        fieldName: 'facebook',
                        currentValues,
                        change,
                      });
                      e.preventDefault();
                    }
                  }
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Field
                  name="instagram"
                  label="Instagram Link"
                  placeholder="https://instagram.com/username"
                  component={TextField}
                  InputProps = {{
                    startAdornment: InstagramAdornment,
                    classes: {
                      input: classes.textInput
                    }
                  }}
                  InputLabelProps={{
                    shrink: true,
                    classes: { shrink: classes.label },
                  }}
                  onBlur={
                    (e) => {
                      formatSocialURL({
                        urlBase: 'https://instagram.com',
                        fieldName: 'instagram',
                        currentValues,
                        change,
                      });
                      e.preventDefault();
                    }
                  }
                />
              </FormControl>
              <FormControl margin="normal" fullWidth style={{ marginBottom: 48 }}>
                <Field
                  name="spotify"
                  label="Spotify Link"
                  placeholder="https://open.spotify.com/artist/12345"
                  component={TextField}
                  InputProps = {{
                    startAdornment: SpotifyAdornment,
                    classes: {
                      input: classes.textInput
                    }
                  }}
                  InputLabelProps={{
                    shrink: true,
                    classes: { shrink: classes.label },
                  }}
                  onBlur={
                    (e) => {
                      formatSocialURL({
                        urlBase: 'https://open.spotify.com/artist',
                        fieldName: 'spotify',
                        currentValues,
                        change,
                      });
                      e.preventDefault();
                    }
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <div style={{zIndex: 100, position: 'absolute', backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.08))', bottom: Math.min(this.state.distanceFromBottom - 10, 0), left: 0, right: 0, height: '10px', transition: 'opacity 0.3s',
  '-webkit-transition': 'opacity 0.3s'}} />
        </div>

      </form>
    );
  }
}

const mapStateToProps = (state, props) => ({
  initialValues: { hometown: "New York", state: "NY" },
  // currentValues: getFormValues(EDIT_BASIC_INFO)(state) || {},

  // TODO this should go into bindActionCreators and be used as an action
  updateUserBio: updateUserBio,
  getGenres: getGenres,
  musicianId: props.musicianId,
  imageFile: selectImageFile(state),
  imagePreview: selectImagePreview(state),
})

// Pulling this out of compose helps initialValues behave correctly.
//  https://stackoverflow.com/a/47475674/103315
// OnboardingForm = reduxForm({
//   form: ARTIST_ONBOARDING,
// })(OnboardingForm)

export default compose(
  withStyles(styles),
  withWidth(),
  connect(mapStateToProps),
  Dialog,
)(OnboardingForm);

