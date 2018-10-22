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

import {
  updateUserBio,
} from '../../request/requests';

import styles from './styles';

// TODO put in constants file
const SEND_ARTIST_MESSAGE = 'SEND_ARTIST_MESSAGE';

class SendArtistMessageForm extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  submit(values) {
    const {
      musicianid,
      updateUserBio,
      closeDialog
    } = this.props;

    console.log("SendArtistMessageForm.submit", values);

    // return updateUserBio(values, musicianid).then(res => {
    //     // TODO: Don't *actually* refresh the page, but update with submitted values
    //     //    temporary stopgap to allow team members to test w/ out
    //     setTimeout(() => {
    //       window.location.reload(true);
    //     }, 1000);
    // })
    // .catch(errors => {
    //   console.log('errors', errors);
    //   // throw new SubmissionError({
    //   //   image: errors.image.join(', ')
    //   // })
    // });
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
                      id="bio"
                      label="bio"
                      name="bio"
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
  musicianId: props.musicianId,
})

SendArtistMessageForm = compose(
  connect(mapStateToProps),
  reduxForm({
    form: SEND_ARTIST_MESSAGE,
  }),
  withStyles(styles)
)(SendArtistMessageForm);

export default connect(mapStateToProps)(SendArtistMessageForm);
