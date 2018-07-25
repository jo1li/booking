import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MobileStepper from '@material-ui/core/MobileStepper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import classNames from 'classnames';
import CONFIGS from '../configs';

const VIDEO_ASPECT_RATIO = 56;
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

class IframeCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {activeStep: 0};
  }

  handleNext() {
    this.refreshIframe(this.state.activeStep);
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack() {
    this.refreshIframe(this.state.activeStep);
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  refreshIframe(idx) {
    const iframe = this.refs[`iframe-${idx}`];
    const src = iframe.src;
    iframe.src = '';
    iframe.src = src;
  }

  render() {

    const { activeStep } = this.state;
    const { videosourcesjson, classes, id, CONFIGS } = this.props;

    let videoSources = [];
    if( videosourcesjson ) {
      videoSources = JSON.parse(videosourcesjson);
    }

    const maxSteps = videoSources.length;
    const nextBtnIsDisabled = activeStep === maxSteps - 1;
    const prevBtnIsDisabled = activeStep === 0;

    return (
      <Fragment>
        <SwipeableViews
          axis='x'
          index={this.state.activeStep}
          enableMouseEvents
          // These classes determine what aspect ratio to use
          className={classNames({
            [classes.videoCarouselSwipeableView]: (id === 'video-carousel'),
            [classes.audioCarouselSwipeableView]: (id === 'audio-carousel'),
          })}
        >
          {videoSources.map((src, idx) => (
            <iframe
              className={classes.iframe}
              ref={`iframe-${idx}`}
              frameBorder="0"
              seamless="seamless"
              key={`video-carousel-iframe-${idx}`}
              src={src}
              alt={src}
              title={src} />
          ))}
        </SwipeableViews>
        <MobileStepper
          className={classes.carouselNav}
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={() => this.handleNext()} disabled={nextBtnIsDisabled}>
              <img
                alt="carousel next button"
                className={`${classes.navButtonIcon} ${nextBtnIsDisabled ? classes.hidden : ''}`}
                src={`${CONFIGS.IMAGES_URL}/next.svg`} />
            </Button>
          }
          backButton={
            <Button size="small" onClick={() => this.handleBack()} disabled={prevBtnIsDisabled}>
              <img
                alt="carousel back button"
                className={`${classes.navButtonIcon} ${prevBtnIsDisabled ? classes.hidden : ''}`}
                src={`${CONFIGS.IMAGES_URL}/prev.svg`} />
            </Button>
          }
        />
        <div className={classes.stepIndicator}>
          {activeStep + 1}/{maxSteps}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  CONFIGS,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(IframeCarousel);
