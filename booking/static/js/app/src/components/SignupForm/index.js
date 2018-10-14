import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
  getFormValues,
} from 'redux-form';
import autoBind from 'react-autobind';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import CancelConfirm from '../CancelConfirm';
import TextArea from '../form/TextArea';
import { Display1 } from '../typography';

import { ARTIST_SIGNUP } from '../../constants'

import styles from './styles';


class SignupForm extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  submit(values) {
    console.log("submit", values);
  }

  render() {
    const {
        classes,
    } = this.props;

    return (
      <div className={classes.container}>
        <h1>React-generated signup....form.</h1>
      </div>
    );
  }
}

// TODO these can probably be combined
SignupForm = withStyles(styles)(SignupForm)

SignupForm = reduxForm({
  form: ARTIST_SIGNUP,
})(SignupForm);

const mapStateToProps = (state, props) => ({})

export default connect(mapStateToProps)(SignupForm);
