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
import { SubmissionError } from 'redux-form';
import ModalHeader from '../ModalHeader';

import {
  sendArtistMessage,
} from '../../request/requests';
import {
  required,
  validateEmail,
} from '../../utils/validators';

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

    var errors = {};

    // @TODO: could prob be collapsed into an elegant loop
    if( !('name' in values ) ) {
      errors['name'] = true;
    }

    if( !('email' in values ) ) {
      errors['email'] = true;
    }

    if( !('message' in values ) ) {
      // TODO: Textarea doesn't show errors, although there
      //      is work being done to make it show errors.
      errors['message'] = true;
    }

    if(Object.keys(errors).length > 0) {
      // TODO: This works, but only seems to show one error at a time.
      throw new SubmissionError(errors);
    }

    return sleep(100)
      .then(() => {
        return sendArtistMessage(musicianid, values);
      }).then((res) => {
        closeDialog();
      })
  }

  render() {
    const {
        closeDialog,
        submitting,
        handleSubmit,
        classes,
        submitSucceeded,
        isCurrentUser
    } = this.props;

    const form = (
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
                        validate={[required]}
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
                        validate={[validateEmail, required]}
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
                        validate={[required]}
                    />
                  </Grid>
                </Grid>
              </form>
    );

    const currentUserMessage = (
      <div style={{textAlign: 'center'}}>
        <p>On your public profile, visitors will use this button to send you email about your music!</p>
        <p><img src="https://media.giphy.com/media/6wcBC9tsubD5jrDL6g/giphy.gif" height="240" /></p>
      </div>
    )

    if( isCurrentUser ) {
      var header = "Opus Messaging";
    } else {
      var header = "Send a Message";
    }


    return (
      <div className={`${classes.container} ${classes.withFooter}`}>
        <ModalHeader classes={classes}>{header}</ModalHeader>
        <div className={classes.scrollableBody}>
          <Grid container spacing={24}>
            <Grid item xs={12} lg={12}>
              {!isCurrentUser ? form : currentUserMessage}
            </Grid>
          </Grid>
        </div>
        {!isCurrentUser && <CancelConfirm
            onClickCancel={closeDialog}
            onClickConfirm={handleSubmit(this.submit)}
            confirmText='Send'
            isLoading={submitting}
            success={submitSucceeded}
            className={classes.footer}
            title={'Send Message'}
        />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  sendArtistMessage: sendArtistMessage,
  isCurrentUser: state.is_current_user
})

SendArtistMessageForm = compose(
  connect(mapStateToProps),
  reduxForm({
    form: SEND_ARTIST_MESSAGE,
  }),
  withStyles(styles)
)(SendArtistMessageForm);

export default connect(mapStateToProps)(SendArtistMessageForm);
