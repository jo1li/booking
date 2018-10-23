import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ARTIST_ONBOARDING } from '../../constants/forms';
import {
  Field,
  reduxForm,
  getFormValues,
} from 'redux-form';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from './TextField';
import SelectState from '../form/SelectState';
import SelectField from './SelectField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '../form/RaisedButton';

import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';

import InputLabel from '@material-ui/core/InputLabel';

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

const TAGLINE_CHARS_MAX = 60
const GENRES_MAX = 3

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
  }
  if (tagline) {
    return tagline.slice(0,TAGLINE_CHARS_MAX)
  }
}

class OnboardingForm extends Component {

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

  submit = (values) => {
    const { updateUserBio } = this.props;

    // return updateUserBio(values).then(res => {
    //   // TODO: This is all placeholder
    //   if(res.status === 200) {
    //     console.log("submitted successfully");
    //   }

    // })
    // .catch(errors => {
    //   console.log('errors', errors);
    //   // TODO: This is all placeholder
    // });
  }

  render() {
    const { classes, pristine, submitting, handleSubmit } = this.props
    return (
      <React.Fragment>
        <CssBaseline/>
        <main className={classes.layout}>
          <Typography variant="headline" align="center">Onboarding</Typography>
          <Paper className={classes.paper}>
            <Typography variant="body2">For Artists</Typography>
            <form className={classes.form} onSubmit={handleSubmit(this.submit)}>
              <FormControl margin="normal" fullWidth>
                <Field 
                  name="tagline" 
                  label="Tagline"
                  multiline={true} 
                  maxLength="90"
                  component={TextField}
                  normalize={normalizeTagline}
                />
                <FormHelperText>Up to 60 characters long</FormHelperText>
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Field 
                  name="genres" 
                  component={SelectField} 
                  label="Genres" 
                  multiple
                  format={value => value || []}
                  normalize={normalizeGenres}
                >
                  {this.state.genres.map(genre => (
                    <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                  ))}
                </Field>
                <FormHelperText>Select up to three</FormHelperText>
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Field 
                  name="facebook_url" 
                  label="Facebook Page"
                  placeholder="https://"
                  component={TextField}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Field 
                  name="instagram_url" 
                  label="Instagram Profile"
                  placeholder="https://"
                  component={TextField}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Field 
                  name="spotify_url" 
                  label="Spotify Artist Page"
                  placeholder="https://"
                  component={TextField}
                />
              </FormControl>
              <Grid container spacing={16}>
                <Grid item style={{flexGrow: 1}}>
                  <FormControl margin="normal" fullWidth>
                    <Field 
                      name="city" 
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
                disabled={pristine || submitting}
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
  initialValues: {city: "New York", state: "NY"},
  currentValues: getFormValues(ARTIST_ONBOARDING)(state) || {},

  // TODO this should go into bindActionCreators and be used as an action
  updateUserBio: updateUserBio,
  getGenres: getGenres,
  musicianId: props.musicianId,
})

export default connect(mapStateToProps)(OnboardingForm);
