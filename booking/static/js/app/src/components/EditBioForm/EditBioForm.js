import React, { Component } from 'react';
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
import ModalHeader from '../ModalHeader';

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
        submitting,
        handleSubmit,
        classes,
        submitSucceeded,
    } = this.props;

    return (
      <div className={`${classes.container} ${classes.withFooter}`}>
        <ModalHeader classes={classes}>Edit Bio</ModalHeader>
        <div className={classes.scrollableBody}>
          <Grid container spacing={24}>
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
              </form>
            </Grid>
          </Grid>
        </div>
        <CancelConfirm
            onClickCancel={closeDialog}
            onClickConfirm={handleSubmit(this.submit)}
            isLoading={submitting}
            success={submitSucceeded}
            title={'Edit Biography'}
            className={classes.footer}
        />
      </div>
    );
  }
}

// TODO these can probably be combined
EditBioForm = withStyles(styles)(EditBioForm)

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
