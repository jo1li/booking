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
import { Display1 } from '../typography';

import {
  updateUserBio,
} from '../../request/requests';

import PhotoEditor from '../PhotoEditor';

import styles from './styles';

import { TEST_IMAGE } from '../../testImage';

// TODO put in constants file
const EDIT_BIO = 'EDIT_BIO';

class EditBioForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        base64Img: props.img || TEST_IMAGE,
    }

    autoBind(this);
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
            <Display1 className={classes.caption} >Edit Profile Photo</Display1>
          </Grid>
          <Grid item xs={12} lg={12}>
            <PhotoEditor
                ref={(ref) => this.photoEditor = ref}
                image={TEST_IMAGE}
                imageName={'test name'}
                onCancel={() => console.log('canceld')}
                onChange={promise => promise.then(res => this.setState({base64Img: res.src}))}
            />
          </Grid>
        </Grid>
        <Grid container direction='row' spacing={24}>
            <Grid item xs={6} lg={6}>
                <img src={this.state.base64Img} style={{width: '200px', height: '100px'}}/>
            </Grid>
            <Grid item xs={6} lg={6}>
              <CancelConfirm
                  onClickCancel={closeDialog}
                  onClickConfirm={() => console.log("hey")}
                  isLoading={submitting}
                  success={submitSucceeded}
                  title={'Edit Biography'}
              />
            </Grid>
        </Grid>
      </div>
    );
  }
}

// TODO these can probably be combined
EditBioForm = withStyles(styles)(EditBioForm)

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
