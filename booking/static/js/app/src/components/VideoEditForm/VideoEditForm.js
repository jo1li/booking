import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux';
import {
  reduxForm,
  getFormValues,
} from 'redux-form';
import autoBind from 'react-autobind';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash'

import CancelConfirm from '../CancelConfirm';
import FullScreenDialog from '../modal/FullScreenDialog';

import { Display1, Caption } from '../typography';

import InputButtons from './InputButtons';
import {
  DeleteButton,
  AddButton,
} from '../form/FabButton';

import TextArea from '../form/TextArea';

import * as VideoActions from '../../actions/videos';
import styles from './styles';

// TODO put in constants file
const EDIT_VIDEOS = 'EDIT_VIDEOS';

class VideoEditForm extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    const {
      getMusicianVideos,
      profile,
    } = this.props;

    getMusicianVideos({musicianId: profile.id});
  }

  submit(values) {
    const {
      initialValues,
      profile,
      createMusicianVideo,
    } = this.props;
    console.log(initialValues);
    console.log(_.diff(initialValues), values.videos)
    console.log({code: values.new_video, musicianId: profile.id});

    // let data = Object.assign({}, values, {
    //   genres: values.genres,
    //   image: _.get(values, 'image.file'),
    // });

    // data = filterUndefined(data);

    return createMusicianVideo({code: values.new_video, musicianId: profile.id});
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

    // const newIdx = _.get(currentValues, 'videos', []).length;

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <CancelConfirm
            onClickCancel={closeDialog}
            isLoading={submitting}
            success={submitSucceeded}
        >
          <Grid container spacing={24} direction="row">
            <Grid className={classes.captionTop} item xs={12} sm={12} md={12} lg={12}>
              <Display1>Edit Videos</Display1>
            </Grid>
              <Grid className={classes.caption} item xs={12} sm={12} md={12} lg={12}>
                <Caption >SOCIAL PROFILES</Caption>
              </Grid>
              {
                _.map(_.get(currentValues, 'videos', []), (video, i) => {
                  return (
                    <InputButtons
                      component={TextArea}
                      key={`iframe-input-${i}`}
                      id={`iframe-input-${i}`}
                      label={`iframe-input-${i}`}
                      name={`videos[${i}]`}
                      placeholder="Copy and paste video player embed code here."
                    >
                      <AddButton/>
                      <DeleteButton
                        disabled={!_.get(currentValues, `videos[${i}]`, '')}
                        onClick={() => change(`videos[${i}]`, '')}
                      />
                    </InputButtons>
                  );
                })
              }
              <InputButtons
                component={TextArea}
                id='iframe-input-last'
                label='iframe-input-last'
                name='new_video'
                placeholder="Copy and paste video player embed code here."
              >
                <AddButton/>
                <DeleteButton
                  disabled={!_.get(currentValues, `new_video`, '')}
                  onClick={() => change(`new_video`, '')}
                />
              </InputButtons>
          </Grid>
        </CancelConfirm>
      </form>
    );
  }
}

// TODO these can probably be combined
VideoEditForm = withStyles(styles)(VideoEditForm)

VideoEditForm = compose(
    FullScreenDialog,
)(VideoEditForm);

VideoEditForm = reduxForm({
  form: EDIT_VIDEOS,
})(VideoEditForm);

const mapStateToProps = (state, props) => ({
  // initialValues: {
  //   videos: JSON.parse(_.get(props, 'videosourcesjson', '[]')),
  // },
  profile: state.profile,
  currentValues: getFormValues(EDIT_VIDEOS)(state),
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createMusicianVideo: VideoActions.createMusicianVideo,
    getMusicianVideos: VideoActions.getMusicianVideos,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoEditForm);
