import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ARTIST_SIGNUP } from '../../constants/forms';
import {
  Field,
  reduxForm,
  getFormValues,
  formValueSelector,
  SubmissionError,
} from 'redux-form';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from './TextField';
import RadioGroup from './RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from '../form/RaisedButton';

import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';


import { createArtist } from '../../request/requests';

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
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: 0,
    marginRight: 0
  },
  typeRadioGroup: {
    paddingTop: `${theme.spacing.unit * 2}px`,
  },
});

const normalizeHandle = (handle) => {
  if (!handle) {
    return handle
  } else {
    // replace any non-alphanumeric character (spaces, ampersands, etc)
    // with a dash, and lowercase the string
    return handle.replace(/\W+/g, '-').toLowerCase();
  }
}

class SignupForm extends Component {

  submit = (values) => {

    const data = {
      email: values.email,
      name: values.name,
      account_type: values.account_type,
      password: values.password
    }
    const { createArtist } = this.props;

    const errors = {}

    // password validation
    if(!data.password || data.password.length < 8) {
      errors.password = 'Password must be atleast 8 characters';
    } else if (data.password.length > 128) {
      errors.password = 'Password cannot be longer than 128 characters';
    }

    // email validation
    const simple_email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if(!data.email) {
      errors.email = 'Email is required.';
    } else if (!simple_email_regex.test(data.email)) {
      errors.email = 'Email is invalid. Please check for typos.';
    }

    // name validation
    if(!data.name) {
      errors.artistName = 'This field is required.';
    }

    // type validation
    if(!data.account_type) {
      errors.artistType = 'Please select an artist type.';
    }

    if(Object.keys(errors).length === 0) {
      return createArtist(data).then(res => {
        if(res.status === 201) {
          window.location.href = '/m/onboarding';
        }
      })
      .catch(error => {
        if(error.response.data) {
          throw new SubmissionError(error.response.data);
          // TODO: this should also mark form as invalid to disable the submit button
        }
      });
    } else {
      throw new SubmissionError(errors);
    }
  }

  render() {
    const { classes, pristine, submitting, handleSubmit } = this.props
    const artistType = this.props.currentValues.artistType;
    return (
      <React.Fragment>
        <CssBaseline/>
        <main className={classes.layout}>
          <Typography variant="headline" align="center">Create an Account</Typography>
          <Paper className={classes.paper}>
            <Typography variant="body2">For Artists</Typography>
            <form className={classes.container} onSubmit={handleSubmit(this.submit)}>
              <FormControl margin="normal" fullWidth>
                <Field name="email" label="Email" component={TextField} />
              </FormControl>
              <div className={classes.typeRadioGroup}>
                <FormControl margin="normal" fullWidth>
                  <FormLabel component="legend">Is this profile for an individual or a group?</FormLabel>
                  <Field
                    component={RadioGroup}
                    aria-label="artist type"
                    name="account_type"
                  >
                    <FormControlLabel value="individual" control={<Radio />} label="Individual" />
                    <FormControlLabel value="group" control={<Radio />} label="Group" />
                  </Field>
                </FormControl>
              </div>
              <FormControl margin="normal" fullWidth>
                <Field
                  name="name"
                  label={artistType === 'individual' ? 'Artist Name' : 'Group Name'}
                  component={TextField}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Field
                  type="password"
                  name="password"
                  label="Password"
                  component={TextField}
                />
              </FormControl>
              <Button
                type="submit"
                disabled={pristine || submitting}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create Account
              </Button>
            </form>
          </Paper>
          <Typography variant="body1" align="center"><a href="/">Opus Homepage</a></Typography>
        </main>
      </React.Fragment>
    );
  }
}

SignupForm = withStyles(styles)(SignupForm)

SignupForm = reduxForm({
  form: ARTIST_SIGNUP,
})(SignupForm);

const mapStateToProps = (state, props) => ({
  initialValues: {
    artistType: "individual"
  },
  currentValues: getFormValues(ARTIST_SIGNUP)(state) || {},

  // TODO this should go into bindActionCreators and be used as an action
  createArtist: createArtist
})

export default connect(mapStateToProps)(SignupForm);
