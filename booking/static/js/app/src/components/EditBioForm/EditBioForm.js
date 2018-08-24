import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
  getFormValues,
  SubmissionError,
} from 'redux-form';
import autoBind from 'react-autobind';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash'

import CancelConfirm from '../CancelConfirm';
import FullScreenDialog from '../modal/FullScreenDialog';
import TextArea from '../form/TextArea';
import { Display1 } from '../typography';

import {
  updateUserBio,
} from '../../request/requests';

import styles from './styles';

// TODO put in constants file
const EDIT_BIO = 'EDIT_BIO';

class EditBioForm extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  submit(values) {
    const {
      musicianid,
      updateUserBio,
    } = this.props;

    return updateUserBio(values, musicianid).then(res => {
        // TODO: Don't *actually* refresh the page, but update with submitted values
        //    temporary stopgap to allow team members to test w/ out
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
    })
    .catch(errors => {
      console.log('errors', errors);
      // throw new SubmissionError({
      //   image: errors.image.join(', ')
      // })
    });
  }

  render() {
    const {
        closeDialog,
        change,
        submitting,
        handleSubmit,
        classes,
        currentValues,
        submitSucceeded,
    } = this.props;

    return (
      <div className={classes.container}>
        <Grid container spacing={24}>
          <Grid item className={classes.captionTop} xs={12} sm={12} md={12} lg={12}>
            <Display1 className={classes.caption} >Edit Basic Info</Display1>
          </Grid>
          <Grid item xs={12} lg={12}>
            <form onSubmit={handleSubmit(this.submit)}>
              <Grid container spacing={24} direction="row">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Field
                      component={TextArea}
                      className={classes.textArea}
                      id="bio"
                      label="bio"
                      name="bio"
                      placeholder="Your bio"
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
                  title={'Edit Biography'}
              />
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// TODO these can probably be combined
EditBioForm = withStyles(styles)(EditBioForm)

EditBioForm = compose(
    FullScreenDialog,
)(EditBioForm);

EditBioForm = reduxForm({
  form: EDIT_BIO,
})(EditBioForm);

const mapStateToProps = (state, props) => ({

  // TODO add defaults value function
  initialValues: {
    bio: props.bio,
  },
  currentValues: getFormValues(EDIT_BIO)(state),

  // TODO this should go into bindActionCreators and be used as an action
  updateUserBio: updateUserBio,
  musicianId: props.musicianId,
})

export default connect(mapStateToProps)(EditBioForm);
