import React, { Component } from 'react';
import { compose } from 'redux';
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
import Input from '../form/Input';
import TextArea from '../form/TextArea';
import { Display1 } from '../typography';
import { SubmissionError } from 'redux-form'

import {
  sendArtistMessage,
} from '../../request/requests';

import styles from './styles';

// TODO put in constants file
const SEND_ARTIST_MESSAGE = 'SEND_ARTIST_MESSAGE';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class SendArtistMessageForm extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  submit(values) {
    const {
      musicianid,
      sendArtistMessage,
      closeDialog
    } = this.props;

    console.log("SendArtistMessageForm.submit props", this.props);
    console.log("SendArtistMessageForm.submit values", values);

    var errors = {};

    // @TOOD: could prob be collapsed into an elegant loop
    if( !('name' in values ) ) {
      errors['name'] = true;
    }

    if( !('email' in values ) ) {
      errors['email'] = true;
    }

    if( !('message' in values ) ) {
      errors['message'] = true;
    }

    if(Object.keys(errors).length > 0) {
      throw new SubmissionError(errors);
    }

    return sleep(100)
      .then(() => {
        return sendArtistMessage(musicianid, values);
      }).then((res) => {
        console.log("SendArtistMessageForm.submit res", res);
        // close the dialog, somehow
      })
      .catch(errors => {
        console.log('SendArtistMessageForm.submit API errors', errors);
      });

  }

  render() {
    const {
        closeDialog,
        submitting,
        handleSubmit,
        classes,
        submitSucceeded,
    } = this.props;

    return (
      <div className={classes.container}>
        <Grid container spacing={24}>
          <Grid item className={classes.captionTop} xs={12} sm={12} md={12} lg={12}>
            <Display1 className={classes.caption}>Send a Message</Display1>
          </Grid>
          <Grid item xs={12} lg={12}>
            <form onSubmit={handleSubmit(this.submit)}>
              <Grid container spacing={24} direction="row">
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Field
                      component={Input}
                      id="name"
                      label="name"
                      name="name"
                      placeholder="Your name"
                      type="text"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Field
                      component={Input}
                      id="email"
                      label="email"
                      name="email"
                      placeholder="Your email"
                      type="text"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Field
                      component={TextArea}
                      className={classes.textArea}
                      id="message"
                      label="message"
                      name="message"
                      placeholder="Your message"
                      type="textarea"
                      multiline
                      fullWidth
                  />
                </Grid>
              </Grid>
              <CancelConfirm
                  onClickCancel={closeDialog}
                  onClickConfirm={handleSubmit(this.submit)}
                  isLoading={submitting}
                  success={submitSucceeded}
                  title={'Send Message'}
              />
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  sendArtistMessage: sendArtistMessage
})

SendArtistMessageForm = compose(
  connect(mapStateToProps),
  reduxForm({
    form: SEND_ARTIST_MESSAGE,
  }),
  withStyles(styles)
)(SendArtistMessageForm);

export default connect(mapStateToProps)(SendArtistMessageForm);
