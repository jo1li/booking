import {
  VIDEO_ASPECT_RATIO,
  AUDIO_ASPECT_RATIO,
} from '../../constants/carousels';

const styles = theme => ({
  navButtonIcon: {
    height: '20px',
    width: '20px',
    fill: theme.palette.grey[500],
    '&:hover': {
      fill: theme.palette.primary.main,
    },
  },
  reverseColorsNavButtonIcon: {
    fill: theme.palette.primary.contrastText,
    '&:hover': {
      fill: theme.palette.secondary.main,
    },
  },
  disabledNavButtonIcon: {
    display: 'none',
  },
  reverseColorsDisabledNavButtonIcon: {
    fill: 'rgba(256,256,256,0.3)',
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
  photoCarouselSwipeableView: {
    height: '100%',
    '& .react-swipeable-view-container > div': {
      height: 'auto',
      position: 'relative',
    },
    '& > .react-swipeable-view-container': {
      height: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0 16px', // Padding doesn't work here
    }
  },

  // TODO: can DRY up two step indicators some
  // TODO: and/or can move some of this to be overwrites in PhotoCarouselModal.js instead
  carouselNav: {
    'background-color': 'transparent',
  },
  stepIndicator: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '14px',
    fontSize: '12px',
    color: theme.palette.grey[500],
    lineHeight: '18px',
    userSelect: 'none',
  },
  reverseColorsCarouselNav: {
    backgroundColor: '#0b0b0b', // TODO: do we want this in palette?
    width: '340px',
    height: '54px',
    margin: '20px auto',
    padding: 0,

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '83px', // Actually renders as 70 (desired). Have not figured out why.
      margin: 0,
    },
  },
  reverseColorsStepIndicator: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '20px',
    fontSize: '16px',
    lineHeight: '50px',
    fontWeight: 'lighter',
    color: theme.palette.primary.contrastText,
    userSelect: 'none',

    [theme.breakpoints.down('xs')]: {
      lineHeight: '70px',
      bottom: 0,
    }
  },
  reverseColorsCarouselNavButton: {
    width: '106px',
    height: '100%',
    '&:hover': {
      backgroundColor: 'black',
    },
  },
  iframe: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    border: '0',
  },
  photo: {
    position: 'absolute',
    'max-height': '100%',
    'max-width': '100%',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
  hidden: {
    display: 'none',
  }
});

export default styles;
