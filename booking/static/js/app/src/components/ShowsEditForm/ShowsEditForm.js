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

import { Caption } from '../typography';

import InputButtons from './InputButtons';
import {
  UploadButton,
  DeleteButton,
  AddButton,
} from '../form/FabButton';

import Button from '../form/Button';

import Input from '../form/Input';
import Select from '../form/Select';
import TextArea from '../form/TextArea';
import SelectState from '../form/SelectState';
import ImageUploadContainer from '../form/ImageUploadContainer';
import TextCount from '../form/TextCount';
import DatePicker from '../form/DatePicker';
import TimePicker from '../form/TimePicker';

import {
  updateUserBio,
  getGenres,
} from '../../request/requests';
import styles from './styles';

// TODO put in constants file
const EDIT_BASIC_INFO = 'EDIT_BASIC_INFO';
const MAX_BIO_SHORT_INPUT_LENGTH = 300;

class ShowsEditForm extends Component {
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
      musicianid,
      updateUserBio,
    } = this.props;

    const data = Object.assign({}, values, {
      genres: values.genres,
      image: _.get(values, 'image.file'),
    });

    return updateUserBio(data, musicianid).then(res => {
      // TODO: Prob a better to check for this
      if(res.status == 200) {
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
        classes,
        currentValues,
        submitSucceeded,
    } = this.props;

    const {
      genres
    } = this.state;

    return (
        <CancelConfirm
            onClickCancel={closeDialog}
            onClickConfirm={handleSubmit(this.submit)}
            isLoading={submitting}
            success={submitSucceeded}
            title={'Edit Event'}
        >
      <form onSubmit={handleSubmit(this.submit)}>
          <Grid container spacing={24} direction="row">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Caption >DATE</Caption>
            </Grid>
            <Grid   item xs={12} sm={12} md={12} lg={12}>
               <Field
                  component={DatePicker}
                  id="date"
                  placeholder="Date"
                  label="date"
                  name="date"
              />
            </Grid>
             <Grid   item xs={12} sm={6} md={6} lg={6}>
              <Caption >START TIME</Caption>
            </Grid>
            <Grid  item xs={12} sm={6} md={6} lg={6}>
              <Caption >END TIME</Caption>
            </Grid>
             <Grid  item xs={12} sm={6} md={6} lg={6}>
                 <Field
                  component={TimePicker}
                  id="StartTime"
                  placeholder="Start time"
                  label="StartTime"
                  name="StartTime"
              />
            </Grid>
             <Grid  item xs={12} sm={6} md={6} lg={6}>
                 <Field
                  component={TimePicker}
                  id="EndTime"
                  placeholder="End Time"
                  label="EndTime"
                  name="EndTime"
              />
            </Grid>

            <Grid   item xs={12} sm={12} md={12} lg={12}>
              <Caption >VENUE</Caption>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Field
                  component={Input}
                  id="venue"
                  label="venue"
                  name="venue"
                  placeholder="What is the venue name"
                  type="text"
              />
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <Field
                  component={Input}
                  id="city"
                  label="city"
                  name="city"
                  placeholder="What is your home town"
                  type="text"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Field
                  component={SelectState}
                  id="state"
                  label="state"
                  name="state"
                  placeholder="state"
                  type="select"
              />
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
                    fullWidth
                  />
              </Grid>
          </Grid>
      </form>
        </CancelConfirm>
    );
  }
}

// TODO these can probably be combined
ShowsEditForm = withStyles(styles)(ShowsEditForm)

ShowsEditForm = compose(
    FullScreenDialog,
)(ShowsEditForm);

ShowsEditForm = reduxForm({
  form: EDIT_BASIC_INFO,
  enableReinitialize: true,
})(ShowsEditForm);

const mapStateToProps = (state, props) => ({

  // TODO add defaults value function
  initialValues: {
    startTime: props.startTime,
    endTime: props.endTime,
    date: props.date,
    venue: props.venue,
    state: props.state,
    city: props.hometown,
    description: props.description,
  },
  currentValues: getFormValues(EDIT_BASIC_INFO)(state),

  // TODO this should go into bindActionCreators and be used as an action
  updateUserBio: updateUserBio,
  getGenres: getGenres,
  musicianId: props.musicianId,
})

export default connect(mapStateToProps)(ShowsEditForm);
