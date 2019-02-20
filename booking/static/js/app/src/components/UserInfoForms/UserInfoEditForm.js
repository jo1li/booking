import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  reduxForm,
  getFormValues,
} from 'redux-form';
import autoBind from 'react-autobind';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash'

import CancelConfirm from '../CancelConfirm';

import ModalHeader from '../ModalHeader';
import UserInfoFormBase from './UserInfoFormBase';
import { EDIT_BASIC_INFO } from '../../constants';

import {
  updateUserBio,
  getGenres,
} from '../../request/requests';
import styles from './styles';

class UserEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
    }

    autoBind(this);
  }

  componentWillMount() {

    // TODO MOVE THIS! this is not the correct way to get data
    this.props.getGenres().then(res => {
      this.setState({
        genres: res.data.results.map(result => result.name)
      })
    })
  }

  submit(values) {
    const {
      musicianId,
      updateUserBio,
    } = this.props;

    const data = Object.assign({}, values, {
      genres: values.genres,
      image: _.get(values, 'image.file'),
    });

    return updateUserBio(data, musicianId).then(res => {
      // TODO: Prob a better to check for this
      if(res.status === 200) {
        // TODO: Don't *actually* refresh the page, but update with submitted values
        //    temporary stopgap to allow team members to test w/ out
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      }

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
        currentValues,
        submitSucceeded,
        classes,
        valid,
    } = this.props;

    const {
      genres
    } = this.state;


    return (
      <div className={`${classes.container} ${classes.withFooter}`}>
        <ModalHeader classes={classes}>Edit Profile Information</ModalHeader>
        <UserInfoFormBase oneColumn={false} currentValues={currentValues} change={change} />
        <CancelConfirm
            onClickCancel={closeDialog}
            onClickConfirm={handleSubmit(this.submit)}
            isLoading={submitting}
            disabled={!valid}
            success={submitSucceeded}
            className={classes.footer}
        />
      </div>
    );
  }
}

// TODO these can probably be combined
UserEditForm = withStyles(styles)(UserEditForm)

UserEditForm = reduxForm({
  form: EDIT_BASIC_INFO,
})(UserEditForm);

const mapStateToProps = (state, props) => ({
  // TODO add defaults value function
  initialValues: {
    stage_name: props.stage_name,
    image: props.image,
    facebook: props.facebook,
    instagram: props.instagram,
    spotify: props.spotify,
    hometown: props.hometown,
    genres: props.genres.map(g => ({ value: g.name, label: g.name })),
    state: props.state,
    website: props.website,
    bio_short: props.bio_short,
  },
  currentValues: getFormValues(EDIT_BASIC_INFO)(state) || {},

  // TODO this should go into bindActionCreators and be used as an action
  updateUserBio: updateUserBio,
  getGenres: getGenres,
  musicianId: props.id,
})

export default connect(mapStateToProps)(UserEditForm);
