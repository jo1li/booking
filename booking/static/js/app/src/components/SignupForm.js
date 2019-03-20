import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ARTIST_SIGNUP } from '../constants/forms';
import {
  Field,
  reduxForm,
  getFormValues,
  SubmissionError,
} from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import TextField from './form/TextField';
import TabbedList from './TabbedList';
import Button from './form/RaisedButton';
import ToggleButtonGroup from './form/ToggleButtonGroup';

import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';

import sharedStyles from '../sharedStyles/artistInfoFormsStyles.js';

import { createArtist } from '../request/requests';

const styles = theme => ({
  ...sharedStyles(theme),
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
    marginBottom: theme.spacing.unit * 8, // Arbitrary, just need some room
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabBody: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px 0`,
    marginTop: theme.spacing.unit,
    marginBlockEnd: `${theme.spacing.unit * 2}px`, // Doesn't automatically get turned into px
  },
  formControl: {
    marginTop: theme.spacing.unit * 3,
  },
  tab: {
    ...theme.typography.body2,
    color: theme.palette.grey[900],
    fontWeight: 400,
    textTransform: 'uppercase',
    flex: 1,
  },
  unselectedTab: {
    borderBottom: `1px solid ${theme.palette.grey[50]}`,
  },
  selectedTab: {
    backgroundColor: theme.palette.secondaryTonal[50],
  },
  artistTypeContainer: {
    paddingTop: `${theme.spacing.unit * 2}px`,
    display: 'flex',

    // Makes the buttons center themselves on the next line on small screens
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  artistTypeLegend: {
    ...theme.typography.body2,
    fontWeight: 400,
    flex: 1,
    display: 'flex',
    alignItems: 'center', // Center text vertically
  },
  toggleButtonGroup: {
    textAlign: 'right',
    boxShadow: 'none',
    display: 'flex',
    flexWrap: 'nowrap',
    flexShrink: 0,
  },
  toggleButton: {
    ...theme.typography.body1,
    backgroundColor: theme.palette.primaryTonal[50],
    padding: '10px 14px 12px',
  },
  selectedToggleButton: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primaryTonal[500],
    // Fix for iOS
    '&:hover': {
        backgroundColor: theme.palette.primaryTonal[500],
    }
  },
});

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
      errors.password = 'Password must be at least 8 characters';
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
      errors.name = 'Name is required.';
    }

    // type validation
    if(!data.account_type) {
      errors.account_type = 'Please select an artist type.';
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
    const { classes, invalid, submitting, handleSubmit, currentValues } = this.props
    const account_type = currentValues.account_type;

    return (
      <React.Fragment>
        <CssBaseline/>
        <main className={classes.layout}>
          <Typography variant="h6" align="center">Join Opus</Typography>
          <Paper className={classes.paper}>
          <TabbedList
              classes={classes}
              tabNames={['For Artists', 'For Venues']} >
            <form className={classNames(classes.form, classes.tabBody)} onSubmit={handleSubmit(this.submit)}>
              <FormControl margin="normal" fullWidth className={classes.formControl}>
                <Field
                  name="email"
                  label='Email'
                  component={TextField}
                  placeholder='Email'
                  InputLabelProps={{
                    classes: {
                      root: classes.placeholder,
                      shrink: classes.label,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.textInput,
                      input: classes.textInput
                    }
                  }}
                  fullWidth
                />
              </FormControl>
              <FormControl margin="normal" fullWidth className={classNames(classes.formControl, classes.artistTypeContainer)}>
                <FormLabel component="legend" className={classes.artistTypeLegend}>Is this account for an individual or a group?</FormLabel>
                <Field
                  component={ToggleButtonGroup}
                  classes={classes}
                  aria-label="artist type"
                  name="account_type"
                  options={[
                    {
                      value: 'individual',
                      label: 'Individual',
                    }, {
                      value: 'group',
                      label: 'Group',
                    }
                  ]}
                  onBlur={e => e.preventDefault()}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth className={classes.formControl}>
                <Field
                  name="name"
                  label={account_type === 'individual' ? 'Artist Name' : 'Group Name'}
                  component={TextField}
                  placeholder={`${account_type === 'individual' ? 'Artist' : 'Group'} Name`}
                  InputLabelProps={{
                    classes: {
                      root: classes.placeholder,
                      shrink: classes.label,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.textInput,
                      input: classes.textInput
                    }
                  }}
                  fullWidth
                />
              </FormControl>
              <FormControl margin="normal" fullWidth className={classes.formControl}>
                <Field
                  type="password"
                  name="password"
                  label="Password"
                  component={TextField}
                  placeholder='Password'
                  InputLabelProps={{
                    classes: {
                      root: classes.placeholder,
                      shrink: classes.label,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.textInput,
                      input: classes.textInput
                    }
                  }}
                  fullWidth
                />
              </FormControl>
              <Button
                type="submit"
                disabled={ invalid || submitting}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create Account
              </Button>
            </form>

            <Typography variant="body1" className={classes.tabBody}>
              Venue profiles coming soon! Sign up for early access <a href="https://goo.gl/forms/ZNCw8SFHFuju1Pyy2">here</a>.
            </Typography>

          </TabbedList>
          </Paper>
          {/* TODO: already have a way to not hardcode /account/login, or need one? */}
          <Typography variant="body1" align="center">Already a member? <a href="/account/login">Log In</a></Typography>
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
    account_type: "individual"
  },
  currentValues: getFormValues(ARTIST_SIGNUP)(state) || {},

  // TODO this should go into bindActionCreators and be used as an action
  createArtist: createArtist
})

export default connect(mapStateToProps)(SignupForm);
