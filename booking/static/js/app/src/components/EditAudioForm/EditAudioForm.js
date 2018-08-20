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
import InputButtons from '../form/InputButtons';

import {
  updateUserBio,
} from '../../request/requests';

import styles from './styles';

// TODO put in constants file
const EDIT_BIO = 'EDIT_BIO';

class EditAudioForm extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  submit(values) {
    const {
      musicianid,
      updateUserBio,
    } = this.props;

    console.log('values', values)
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
        <CancelConfirm
            onClickCancel={closeDialog}
            onClickConfirm={handleSubmit(this.submit)}
            isLoading={submitting}
            success={submitSucceeded}
            title={'Edit Biography'}
        >
      <form onSubmit={handleSubmit(this.submit)}>
          <Grid container spacing={24} direction="row">
              <InputButtons
                component={Input}
                id="image"
                label="image"
                name="image.name"
                placeholder="Your Avatar"
                type="text"
              >
                <ImageUploadContainer
                  onUpload={values => change('image', values)}
                >
                  <UploadButton/>
                </ImageUploadContainer>
              </InputButtons>
              <InputButtons
                component={Input}
                id="image"
                label="image"
                name="image.name"
                placeholder="Your Avatar"
                type="text"
              >
                <ImageUploadContainer
                  onUpload={values => change('image', values)}
                >
                  <UploadButton/>
                </ImageUploadContainer>
              </InputButtons>
          </Grid>
      </form>
        </CancelConfirm>
    );
  }
}

// TODO these can probably be combined
EditAudioForm = withStyles(styles)(EditAudioForm)

EditAudioForm = compose(
    FullScreenDialog,
)(EditAudioForm);

EditAudioForm = reduxForm({
  form: EDIT_BIO,
})(EditAudioForm);

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

export default connect(mapStateToProps)(EditAudioForm);
