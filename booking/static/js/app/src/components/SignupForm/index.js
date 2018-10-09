import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ARTIST_SIGNUP } from '../../constants/forms';
import {
  Field,
  reduxForm,
  getFormValues,
  formValueSelector,
} from 'redux-form';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from './TextField';
import Button from '../form/RaisedButton';

import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';

import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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
  toggleContainer: {
    paddingTop: `${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing.unit}px 0 0`,
    // background: theme.palette.background.default,
  },
});

const renderToggleGroup = ({input, ...rest}) => (
  <ToggleButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
)


class SignupForm extends Component {

  state = {
    showPassword: false,
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  }

  handleSubmit(values) {
    values.preventDefault();
    console.log("submit", values);
  }

  handleType = (event, type) => this.setState({ type });

  render() {
    const { classes, pristine, submitting, type } = this.props

    return (
      <React.Fragment>
        <CssBaseline/>
        <main className={classes.layout}>
          <Typography variant="headline" align="center">Create an Account</Typography>
          <Paper className={classes.paper}>
            <Typography variant="body2">For Artists</Typography>
            <form className={classes.container} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <Field name="email" label="Email" component={TextField} />
              </FormControl>
              <div className={classes.toggleContainer}>
                <FormControl required>
                  <Field name="artistType" component={renderToggleGroup}>
                    <ToggleButton value="individual">
                      <Typography variant="body1" align="center">Individual</Typography>
                    </ToggleButton>
                    <ToggleButton value="group">
                      <Typography variant="body1" align="center">Group</Typography>
                    </ToggleButton>
                  </Field>
                </FormControl>
              </div>

              <FormControl margin="normal" required fullWidth>
                <Field name="artistName" label={type === 'individual' ? 'Artist Name' : 'Group Name'} component={TextField} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <Field name="artistHandle" label="Handle" component={TextField} />
                <FormHelperText id="artistHandle-helper-text">opuslive.io/m/handle</FormHelperText>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <Field 
                  type={this.state.showPassword ? 'text' : 'password'}
                  name="password" 
                  label="Password"
                  component={TextField} 
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
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
  initialValues: {
    artistType: "individual"
  }
})(SignupForm);

const selector = formValueSelector(ARTIST_SIGNUP)
SignupForm = connect(
  state => {
    const type = selector(state, 'artistType')
    return {
      type,
    }
  }
)(SignupForm);

const mapStateToProps = (state, props) => ({})

export default connect(mapStateToProps)(SignupForm);
