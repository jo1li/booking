const VIDEO_ASPECT_RATIO = 56;
const IMAGE_ASPECT_RATIO = 66;
const AUDIO_ASPECT_RATIO = 72;

const styles = theme => ({
  navButtonIcon: {
    height: '20px',
    width: '20px',
  },

  // Modify size of window depending on type of carousel
  audioCarouselSwipeableView: {
    '& .react-swipeable-view-container > div': {
      'padding-top': `${AUDIO_ASPECT_RATIO}%`,
      height: 'auto',
      position: 'relative',
    }
  },
  videoCarouselSwipeableView: {
    '& .react-swipeable-view-container > div': {
      'padding-top': `${VIDEO_ASPECT_RATIO}%`,
      height: 'auto',
      position: 'relative',
    }
  },
  imageCarouselSwipeableView: {
    '& .react-swipeable-view-container > div': {
      'padding-top': `${IMAGE_ASPECT_RATIO}%`,
      height: 'auto',
      position: 'relative',
    }
  },

  carouselNav: {
    'background-color': 'transparent',
  },
  iframe: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    border: '0',
  },
  // TODO: name better
  image: {
    position: 'absolute',
    'max-height': '100%',
    'max-width': '100%',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
  stepIndicator: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '14px',
    'font-size': '12px',
    color: theme.palette.grey[500],
    'line-height': '18px',
    'user-select': 'none',
  },
  hidden: {
    display: 'none',
  }
});

export default styles;
