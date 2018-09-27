import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import $ from "jquery";

import CarouselWrapper from './CarouselWrapper';
import EmptyState from '../EmptyState';
import { IframeCarouselContent, PhotoCarouselContent } from './CarouselContent';
import styles from './styles';


const mapStateToProps = (state, props) => ({
  videos: _.sortBy(_.values(state.videos), v => v.order),
  audios: _.sortBy(_.values(state.audios), a => a.order),
  photos: _.sortBy(_.values(state.photos), p => p.order),
});

export const AudioCarousel = connect(mapStateToProps)(withStyles(styles)(
  props => {
    const { classes, audiosjson, audios: audiosFromStore  } = props;
    const audiosFromDOM = audiosjson ? JSON.parse(audiosjson) : [];

    // If we haven't synced with the server since load, use bootstrapped values.
    const audios = audiosFromStore === false ? audiosFromDOM : audiosFromStore ;

    // This prob shouldn't be like this either, but I'm loathe to add a new React component
    if( audios.length === 0 ) {
      $($('.edit .open-edit-audios')[0]).hide()
      return <EmptyState triggerSelector=".open-edit-audios" copy="Add audio tracks" />;
    } else {
      $($('.edit .open-edit-audios')[0]).show()
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
  })
);

export const VideoCarousel = connect(mapStateToProps)(withStyles(styles)(
  props => {
    const { classes, videosjson, videos: videosFromStore } = props;
    const videosFromDOM = videosjson ? JSON.parse(videosjson) : [];

    // If this is the initial run, load from dom
    //  There may be a better way / place to load data. (CH)
    const videos = videosFromStore === false ? videosFromDOM : videosFromStore ;

    // This prob shouldn't be like this either, but I'm loathe to add a new React component
    if( videos.length === 0 ) {
      $($('.edit .open-edit-videos')[0]).hide()
      return <EmptyState triggerSelector=".open-edit-videos" copy="Add video of your performances" />;
    } else {
      $($('.edit .open-edit-videos')[0]).show()
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
  })
);

export const PhotoCarousel = connect(mapStateToProps)(withStyles(styles)(
  props => {
    const { classes, photos } = props;

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
  })
);
