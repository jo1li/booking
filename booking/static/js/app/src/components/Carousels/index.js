import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import CarouselWrapper from './CarouselWrapper';
import { IframeCarouselContent, PhotoCarouselContent } from './CarouselContent';
import styles from './styles';

const AudioCarousel = withStyles(styles)(props => {
  const { classes, audiosourcesjson  } = props;
  const audioSources = audiosourcesjson ? JSON.parse(audiosourcesjson) : [];

  return (
    <CarouselWrapper
        classes={classes}
        itemCount={audioSources.length}>
      <IframeCarouselContent
          className={classes.audioCarouselSwipeableView}
          classes={classes}
          iframeSources={audioSources}/>
    </CarouselWrapper>
  );
});

const VideoCarousel = withStyles(styles)(props => {
  const { classes, videosourcesjson } = props;
  const videoSources = videosourcesjson ? JSON.parse(videosourcesjson) : [];

  return (
    <CarouselWrapper
        classes={classes}
        itemCount={videoSources.length}>
      <IframeCarouselContent
          className={classes.videoCarouselSwipeableView}
          classes={classes}
          iframeSources={videoSources}/>
    </CarouselWrapper>
  );
});

// TODO: Add a background image for when photos don't cover the full width,
//       consisting of a shaded version of the user's profile image scaled to
//       at least full width, once redux is in to gives this access to it.
const PhotoCarousel = withStyles(styles)(props => {
  const { classes, photosourcesjson } = props;
  const photoSources = photosourcesjson ? JSON.parse(photosourcesjson) : [];

  return (
    <CarouselWrapper
        classes={classes}
        itemCount={photoSources.length}>
      <PhotoCarouselContent
          className={classes.photoCarouselSwipeableView}
          classes={classes}
          photoSources={photoSources}/>
    </CarouselWrapper>
  );
});

export { AudioCarousel, PhotoCarousel, VideoCarousel };
