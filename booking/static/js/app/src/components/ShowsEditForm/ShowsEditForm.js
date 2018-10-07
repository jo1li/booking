import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
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

import { Caption, Display1 } from '../typography';

import Input from '../form/Input';
import TextArea from '../form/TextArea';
import SelectState from '../form/SelectState';
import DatePicker from '../form/DatePicker';
import TimePicker from '../form/TimePicker';

// import * as SlotActions from '../../request/slots';
import styles from './styles';

import { EDIT_SLOTS } from '../../constants/forms';

class ShowsEditForm extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  submit(values) {
    const {
      // TODO: why capitalization like that?
      musicianid,
      updateArtistSlot,
    } = this.props;

    const data = Object.assign({}, values, {
      genres: values.genres,
      image: _.get(values, 'image.file'),
    });

    return updateArtistSlot(data, musicianid).then(res => {
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
      throw new SubmissionError({})
    });
  }

  render() {
    const {
      classes,
      closeDialog,
      submitting,
      handleSubmit,
      submitSucceeded,
    } = this.props;

    return (
      <div className={classes.container}>
        <Grid container spacing={24}>
          <Grid item className={classes.captionTop} xs={12} sm={12} md={12} lg={12}>
            <Display1 className={classes.caption}>Edit Event</Display1>
          </Grid>
          <Grid item xs={12} lg={12}>
            <form onSubmit={handleSubmit(this.submit)}>
              <Grid container spacing={24} direction="row">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                   <Field
                      component={DatePicker}
                      id="date"
                      placeholder="Date"
                      label="date"
                      name="date" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Caption>START TIME</Caption>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Caption>END TIME</Caption>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                   <Field
                    component={TimePicker}
                    id="StartTime"
                    placeholder="Start time"
                    label="StartTime"
                    name="StartTime" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Field
                    component={TimePicker}
                    id="EndTime"
                    placeholder="End Time"
                    label="EndTime"
                    name="EndTime" />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Caption>VENUE</Caption>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Field
                    component={Input}
                    id="venue"
                    label="venue"
                    name="venue"
                    placeholder="What is the venue name"
                    type="text" />
                </Grid>
                <Grid item xs={12} sm={8} md={8} lg={8}>
                  <Field
                    component={Input}
                    id="city"
                    label="city"
                    name="city"
                    placeholder="What is your home town"
                    type="text" />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Field
                    component={SelectState}
                    id="state"
                    label="state"
                    name="state"
                    placeholder="state"
                    type="select" />
                </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Caption>DESCRIPTION</Caption>
                      <Field
                        component={TextArea}
                        id="description"
                        label="description"
                        name="description"
                        placeholder="Description"
                        type="textarea"
                        multiline
                        fullWidth />
                  </Grid>
              </Grid>
            </form>
          </Grid>
          <CancelConfirm
            onClickCancel={closeDialog}
            onClickConfirm={handleSubmit(this.submit)}
            isLoading={submitting}
            success={submitSucceeded}
            title={'Edit Event'} />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  // TODO add defaults value function
  initialValues: {
    start_datetime: props.start_datetime,
    end_datetime: props.end_datetime,
    venue_name: props.venue_name,
    venue_city: props.venue_city,
    venue_state: props.venue_state,
    // TODO: doesn't match actual attrs yet
    description: props.description,
  },
  currentValues: getFormValues(EDIT_SLOTS)(state),
  musicianId: props.musicianId,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    // createArtistSlot,
    // updateArtistSlot,
  }, dispatch);
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: EDIT_SLOTS,
    enableReinitialize: true,
  }),
  FullScreenDialog,
  withStyles(styles),
)(ShowsEditForm);
