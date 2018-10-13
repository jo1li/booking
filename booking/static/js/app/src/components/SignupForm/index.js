import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ARTIST_SIGNUP } from '../../constants/forms';
import {
  Field,
  reduxForm,
  getFormValues,
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

class SignupForm extends Component {

  handleSubmit(values) {
    const { createUser } = this.props;

    return createUser(values).then(res => {
      // TODO: This is all placeholder
      if(res.status === 200) {
        console.log("submitted successfully");
      }

    })
    .catch(errors => {
      console.log('errors', errors);
      // TODO: This is all placeholder
    });
  }

  handleNameChange = (e) => {
    const value = e.target.value;
    if (!this.props.currentValues.artistHandle) {
      this.props.change("artistHandle", value);
    }
  }

  render() {
    const { classes, pristine, submitting } = this.props
    const artistType = this.props.currentValues.artistType;
    return (
      <React.Fragment>
        <CssBaseline/>
        <main className={classes.layout}>
          <Typography variant="headline" align="center">Create an Account</Typography>
          <Paper className={classes.paper}>
            <Typography variant="body2">For Artists</Typography>
            <form className={classes.container} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" fullWidth>
                <Field name="email" label="Email" component={TextField} />
              </FormControl>
              <div className={classes.typeRadioGroup}>
                <FormControl margin="normal" fullWidth>
                  <FormLabel component="legend">Is this profile for an individual or a group?</FormLabel>
                  <Field
                    component={RadioGroup}
                    aria-label="artist type"
                    name="artistType"
                  >
                    <FormControlLabel value="individual" control={<Radio />} label="Individual" />
                    <FormControlLabel value="group" control={<Radio />} label="Group" />
                  </Field>
                </FormControl>
              </div>
              <FormControl margin="normal" fullWidth>
                <Field 
                  name="artistName" 
                  label={artistType === 'individual' ? 'Artist Name' : 'Group Name'} 
                  component={TextField}
                  onChange={this.handleNameChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Field name="artistHandle" label="Handle" component={TextField} />
                <FormHelperText id="artistHandle-helper-text">opuslive.io/m/handle</FormHelperText>
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
  onChange: (values, dispatch, props) => {
    // console.log("vals", values);
    // console.log("props", props);
    // dispatch(props.change("artistHandle", "test"));
  }
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
