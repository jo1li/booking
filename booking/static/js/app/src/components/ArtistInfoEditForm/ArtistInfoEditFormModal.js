import React, { Component } from 'react';
import { connect} from 'react-redux';
import { compose } from 'redux';
import {
  reduxForm,
  getFormValues,
} from 'redux-form';
import autoBind from 'react-autobind';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import classNames from 'classnames';
import _ from 'lodash'

import CancelConfirm from '../CancelConfirm';

import ModalHeader from '../ModalHeader';
import ArtistInfoEditForm from './ArtistInfoEditForm';
import { Dialog } from '../Dialog';
import { EDIT_BASIC_INFO } from '../../constants';

import { updateUserBio } from '../../request/requests';
import styles from './styles';

class ArtistInfoEditFormModal extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  submit(values) {
    const {
      musicianId,
      updateUserBio,
    } = this.props;

    const genres = values.genres ? values.genres.map(g => `"${g.value}"`).join(",") : "";
    const data = Object.assign({}, values, { genres });

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

    return (
      <div className={classNames(classes.container, classes.withFooter)}>
        <ModalHeader classes={classes}>Edit Profile Information</ModalHeader>
        <CssBaseline/>
        <ArtistInfoEditForm oneColumn={false} currentValues={currentValues} change={change} />
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

ArtistInfoEditFormModal = reduxForm({
  form: EDIT_BASIC_INFO,
})(ArtistInfoEditFormModal);

const mapStateToProps = (state, props) => ({
  // TODO add defaults value function
  initialValues: {
    stage_name: props.stage_name,
    // TODO: better way to do this?
    image: { preview: props.image, isFile: true, name: 'image.jpg' },
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
  musicianId: props.id,
})

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
  Dialog,
)(ArtistInfoEditFormModal);
