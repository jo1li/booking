import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import CarouselWrapper from './CarouselWrapper';
import EmptyState from '../EmptyState';
import { IframeCarouselContent, PhotoCarouselContent } from './CarouselContent';
import styles from './styles';

const mapStateToProps = (state, props) => {

  var retval = {}

  retval['videos'] = ( state.videos === false )
                    ? false
                    : _.sortBy(_.values(state.videos), v => v.order) ;

  retval['audios'] = ( state.audios === false)
                    ? false
                    : _.sortBy(_.values(state.audios), a => a.order);

  return retval;

};

export const AudioCarousel = connect(mapStateToProps)(withStyles(styles)(
  props => {
    const { classes, audiosjson, audios: audiosFromStore  } = props;
    const audiosFromDOM = audiosjson ? JSON.parse(audiosjson) : [];

    // If we haven't synced with the server since load, use bootstrapped values.
    const audios = audiosFromStore.length ? audiosFromStore : audiosFromDOM;

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

    if( videos.length === 0 ) {
      return <EmptyState />;
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

// TODO: Add a background image for when photos don't cover the full width,
//       consisting of a shaded version of the user's profile image scaled to
//       at least full width, once redux is in to gives this access to it.
export const PhotoCarousel = withStyles(styles)(props => {
  const { classes, photosjson } = props;
  const photos = photosjson ? JSON.parse(photosjson) : [];

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
});
