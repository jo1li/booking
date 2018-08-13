// TODO: There is a lot of duplication between this module and UserEditForm.
//       Plenty to DRY up.
import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import withWidth from '@material-ui/core/withWidth';

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

import { Display1 } from '../typography';

import TextArea from '../form/TextArea';
import InputButtons from './InputButtons';
import {
  HelpButton,
  DeleteButton,
  MoveButton,
} from '../form/FabButton';

import * as VideoActions from '../../actions/videos';
import styles from './styles';

import { EDIT_VIDEOS } from '../../constants/forms';

class VideoCodeInput extends Component {
  render() {
    const { order, destroy, innerRef, dndProvidedProps, classes, width } = this.props;

    // NB: Classname on highest div includes plain string
    // so it can be referred to within the `styles`.
    return (
      <div
          ref={innerRef}
          className={`${classes['video-code-input']} video-code-input`}
          {...dndProvidedProps.draggableProps} >
        <Grid container direction="row">
          <InputButtons
              innerRef={innerRef}
              component={TextArea}
              key={`input-videos-[${order}]`}
              name={`videos[${order}].code`}
              placeholder="Copy and paste video player embed code here."
              isMobile={'xs' === width}
            >
            <HelpButton
                mobileText="help"
                onClick={() => {}}
                className={classes.button} />
            <DeleteButton
                mobileText="clear"
                onClick={() => destroy(order)}
                className={classes.button} />
            <div
                {...dndProvidedProps.dragHandleProps}
                className={classes.buttonContainer} >
              <MoveButton
                  {...dndProvidedProps.dragHandleProps}
                  onMouseDown={(e) => {
                    /**
                     * We can't implement movebutton as a drag handle in the
                     * usual way because of some features we are using on
                     * fabbutton, but we can wrap it and ask the movebutton to
                     * send its mousedown to the parent.
                     * NB: target on lhs and currentTarget on rhs is intentional.
                     */
                    e.target = e.currentTarget.parentNode;
                    return dndProvidedProps.dragHandleProps.onMouseDown(e);
                  }}
                  mobileText="move"
                  className={`${classes.moveButton} ${classes.button}`} />
            </div>
          </InputButtons>
        </Grid>
      </div>
    );
  }
}

class VideoEditForm extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    const {
      getArtistVideos,
      profile,
    } = this.props;

    getArtistVideos({artistId: profile.id});
  }

  ensureBlankInputAvailable() {
    const { currentValues, change } = this.props;
    const lastVideoHasCode = !!(_.last(currentValues.videos) || {}).code;

    if(lastVideoHasCode) {
      const order = _.size(currentValues.videos);
      change(`videos[${order}]`, {order});
    }
  }

  removeVideoFromForm(order) {
    const { currentValues, change } = this.props;
    let remainingVideos = _.clone(currentValues.videos);
    delete remainingVideos[order];
    remainingVideos = _.map(remainingVideos, (v, idx) => {return {...v, order: idx}});
    change('videos', remainingVideos);
  }

  getUpdatedVideos(currentVideos) {
    const { initialValues } = this.props;
    const initialVideos = initialValues.videos;

    const initialVideosByID = _.keyBy(initialVideos, 'id');

    return _.filter(currentVideos, (video) => {
      // Videos not yet on the server can't be updated.
      if (!video.id) return false;

      const initialState = initialVideosByID[video.id];
      const codeWasChanged = video.code !== initialState.code;
      const orderWasChanged = video.order !== initialState.order;
      return codeWasChanged || orderWasChanged;
    });
  }

  getCreatedVideos(currentVideos) {
    return _.filter(currentVideos, v => !v.id);
  }

  getDestroyedVideos(currentVideos) {
    const { initialValues } = this.props;
    const initialVideos = initialValues.videos;

    const currentVideosByID = _.keyBy(currentVideos, 'id');

    return _.filter(initialVideos, (video) => {
      // Videos not yet on the server can't be destroyed.
      return !!video.id && !_.has(currentVideosByID, video.id);
    });
  }

  getVideosWithCodes() {
    const { currentValues } = this.props;
    const videosWithCodes = _.filter(currentValues.videos, v => !!v.code);
    // Update the order of each video so there will be no gaps
    const orderedVideosWithCodes = _.sortBy(videosWithCodes, v => v.order);
    return _.map(orderedVideosWithCodes, (v, idx) => {return {...v, order: idx}});
  }

  submit(values) {
    const {
      profile,
      updateArtistVideo,
      createArtistVideo,
      destroyArtistVideo,
      closeDialog,
    } = this.props;

    // Treat videos with no value in the `code` field as absent,
    // and ensure no gaps in `order` attributes.
    const videosWithCodes = this.getVideosWithCodes();

    const videosToUpdate = this.getUpdatedVideos(videosWithCodes);
    const videosToCreate = this.getCreatedVideos(videosWithCodes);
    const videosToDestroy = this.getDestroyedVideos(videosWithCodes);

    const updateRequests = _.map(videosToUpdate, (video) => {
      updateArtistVideo({
        videoId: video.id,
        code: video.code,
        order: video.order,
        artistId: profile.id,
      });
    });

    const createRequests = _.map(videosToCreate, (video) => {
      createArtistVideo({
        code: video.code,
        order: video.order,
        artistId: profile.id,
      });
    });

    const destroyRequests = _.map(videosToDestroy, (video) => {
      destroyArtistVideo({
        videoId: video.id,
        artistId: profile.id,
      });
    });

    const requests = _.concat(updateRequests, createRequests, destroyRequests);

    // TODO: handle error
    Promise.all(requests).then(closeDialog);
  }

  renderVideoInputs() {
    const { currentValues, classes, width } = this.props;
    return _.map(currentValues.videos, (props, idx) => {
      return <Draggable key={`video-code-input-${idx}`} draggableId={`videos[${props.order}]`} index={idx}>
        {(provided, snapshot) => (
          <VideoCodeInput
            {...props}
            dndProvidedProps={provided}
            innerRef={provided.innerRef}
            classes={classes}
            width={width}
            destroy={(args) => this.removeVideoFromForm(args)} />
        )}
      </Draggable>;
    })
  }

  getReorderedVideos(videosFromForm, startIndex, endIndex) {
    let reorderedVideos = Array.from(videosFromForm);
    const [displacedVideo] = reorderedVideos.splice(startIndex, 1);
    reorderedVideos.splice(endIndex, 0, displacedVideo);
    reorderedVideos = _.map(reorderedVideos, (v, idx) => {return {...v, order: idx}});
    return reorderedVideos;
  };

  onDragEnd(result) {
    const { currentValues, change } = this.props;

    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    change('videos', this.getReorderedVideos(
      currentValues.videos,
      result.source.index,
      result.destination.index,
    ));
  }

  render() {
    const {
        closeDialog,
        submitting,
        handleSubmit,
        classes,
        submitSucceeded,
    } = this.props;

    // TODO: Design specs list a "help" button - what do we want this to do/say?
    //       How does user interact with it on mobile and on desktop?
    // TODO: Buttons should have text, and should be above the "code" textarea

    this.ensureBlankInputAvailable();

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="VideoEditForm">
          {(provided, snapshot) => (
            <form onSubmit={handleSubmit(this.submit)} ref={provided.innerRef}>
              <CancelConfirm
                onClickCancel={closeDialog}
                isLoading={submitting}
                success={submitSucceeded}
              >
                <Grid container spacing={24} direction="row">
                  <Grid className={classes.captionTop} item xs={12} sm={12} md={12} lg={12}>
                    <Display1>Edit Videos</Display1>
                  </Grid>
                </Grid>
                <div className={classes['video-code-input-parent']}>
                  { this.renderVideoInputs() }
                </div>
              </CancelConfirm>
            </form>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state, props) => ({
  initialValues: {
    videos: _.sortBy(_.values(state.videos), v => v.order),
  },
  videos: _.sortBy(_.values(state.videos), v => v.order),
  profile: state.profile,
  currentValues: getFormValues(EDIT_VIDEOS)(state),
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getArtistVideos: VideoActions.getArtistVideos,
    updateArtistVideo: VideoActions.updateArtistVideo,
    createArtistVideo: VideoActions.createArtistVideo,
    destroyArtistVideo: VideoActions.destroyArtistVideo,
  }, dispatch);
};

VideoEditForm = compose(
  reduxForm({
    form: EDIT_VIDEOS,
    // This allows `initialValues` to be updated below
    enableReinitialize: true,
  }),
  withStyles(styles),
  withWidth(),
  FullScreenDialog,
)(VideoEditForm);

export default connect(mapStateToProps, mapDispatchToProps)(VideoEditForm);
