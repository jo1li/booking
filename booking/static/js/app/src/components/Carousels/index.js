import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import CarouselWrapper from './CarouselWrapper';
import { IframeCarouselContent, PhotoCarouselContent } from './CarouselContent';
import styles from './styles';

const AudioCarousel = withStyles(styles)(props => {
  const { classes, audiosjson  } = props;
  const audios = audiosjson ? JSON.parse(audiosjson) : [];

  return (
    <CarouselWrapper
        classes={classes}
        itemCount={audios.length}>
      <IframeCarouselContent
          className={classes.audioCarouselSwipeableView}
          classes={classes}
          iframeSources={_.map(audios, a => a.src)}/>
    </CarouselWrapper>
  );
});

const VideoCarousel = withStyles(styles)(props => {
  const { classes, videosjson } = props;
  const videos = videosjson ? JSON.parse(videosjson) : [];

  return (
    <CarouselWrapper
        classes={classes}
        itemCount={videos.length}>
      <IframeCarouselContent
          className={classes.videoCarouselSwipeableView}
          classes={classes}
          iframeSources={_.map(videos, v => v.src)}/>
    </CarouselWrapper>
  );
});

// TODO: Add a background image for when photos don't cover the full width,
//       consisting of a shaded version of the user's profile image scaled to
//       at least full width, once redux is in to gives this access to it.
const PhotoCarousel = withStyles(styles)(props => {
  const { classes, photosjson } = props;
  const photos = photosjson ? JSON.parse(photosjson) : [];

  return (
    <CarouselWrapper
        classes={classes}
        itemCount={photos.length}>
      <PhotoCarouselContent
          className={classes.photoCarouselSwipeableView}
          classes={classes}
          photoSources={_.map(photos, p => p.image)}/>
    </CarouselWrapper>
  );
});

export { AudioCarousel, PhotoCarousel, VideoCarousel };
