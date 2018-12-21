import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { AudioEditForm, VideoEditForm } from '../DraggableCodeForms';
import { FullScreenDialog } from '../Dialog';
import $ from "jquery";

import CarouselWrapper from './CarouselWrapper';
import EmptyState from '../EmptyState';
import { IframeCarouselContent, PhotoCarouselContent } from './CarouselContent';
import styles from './styles';

const mapStateToProps = (state, props) => {
  const videos = ( state.videos === false )
                    ? false
                    : _.sortBy(_.values(state.videos), v => v.order) ;

  const audios = ( state.audios === false)
                    ? false
                    : _.sortBy(_.values(state.audios), a => a.order);

  const photos = _.sortBy(_.values(state.photos), p => p.order);

  return { videos, audios, photos };
};

class AudioCarouselBase extends Component {
  render() {
    const { classes, audiosjson, audios: audiosFromStore, openDialog  } = this.props;
    const audiosFromDOM = audiosjson ? JSON.parse(audiosjson) : [];

    // If we haven't synced with the server since load, use bootstrapped values.
    const audios = audiosFromStore === false ? audiosFromDOM : audiosFromStore ;

    // This prob shouldn't be like this either, but I'm loathe to add a new React component
    if( audios.length === 0 ) {
      $('.edit .open-edit-audios').first().hide()
      return <EmptyState onClick={() => openDialog(<AudioEditForm />)} copy="Add audio tracks" />;
    } else {
      $('.edit .open-edit-audios').first().show()
    }

    return (
      <CarouselWrapper
          classes={classes}
          items={audios}>
        <IframeCarouselContent
            className={classes.audioCarouselSwipeableView}
            classes={classes}
            iframeSources={_.map(audios, a => a.src)}/>
      </CarouselWrapper>
    );
  }
}

class VideoCarouselBase extends Component {
  render() {
    const videosFromDOM = videosjson ? JSON.parse(videosjson) : [];

    // If this is the initial run, load from dom
    //  There may be a better way / place to load data. (CH)
    const videos = videosFromStore === false ? videosFromDOM : videosFromStore ;

    // This prob shouldn't be like this either, but I'm loathe to add a new React component
    if( videos.length === 0 ) {
      $('.edit .open-edit-videos').first().hide()
      return <EmptyState onClick={() => openDialog(<VideoEditForm />)} copy="Add video of your performances" />;
    } else {
      $('.edit .open-edit-videos').first().show()
    }

    return (
      <CarouselWrapper
          classes={classes}
          items={videos}>
        <IframeCarouselContent
            className={classes.videoCarouselSwipeableView}
            classes={classes}
            iframeSources={_.map(videos, v => v.src)}/>
      </CarouselWrapper>
    );
  }
}

class PhotoCarouselBase extends Component {


    return (
      <CarouselWrapper
          classes={classes}
          items={photos}>
        <PhotoCarouselContent
            className={classes.photoCarouselSwipeableView}
            classes={classes}
            photoSources={_.map(photos, p => p.image)}/>
      </CarouselWrapper>
    );
  }
}


export const AudioCarousel = compose(
  connect(mapStateToProps),
  withStyles(styles),
  FullScreenDialog,
)(AudioCarouselBase);

export const VideoCarousel = compose(
  connect(mapStateToProps),
  withStyles(styles),
  FullScreenDialog,
)(VideoCarouselBase);

export const PhotoCarousel = compose(
 connect(mapStateToProps),
 withStyles(styles),
)(PhotoCarouselBase);
