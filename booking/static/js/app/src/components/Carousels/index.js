import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import CarouselWrapper from './CarouselWrapper';
import { IframeCarouselContent, ImageCarouselContent } from './CarouselContent';
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

// TODO: Add a background image for when images don't cover the full width,
//       consisting of a shaded version of the user's profile image scaled to
//       at least full width, once redux is in to gives this access to it.
const ImageCarousel = withStyles(styles)(props => {
  const { classes, imagesourcesjson } = props;
  const imageSources = imagesourcesjson ? JSON.parse(imagesourcesjson) : [];

  return (
    <CarouselWrapper
        classes={classes}
        itemCount={imageSources.length}>
      <ImageCarouselContent
          className={classes.imageCarouselSwipeableView}
          classes={classes}
          imageSources={imageSources}/>
    </CarouselWrapper>
  );
});

export { AudioCarousel, ImageCarousel, VideoCarousel };
