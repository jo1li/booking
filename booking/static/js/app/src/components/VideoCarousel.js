import React, { Component, Fragment } from 'react';
import { compose } from 'redux'
import logo from '../logo.svg';
import BindDomEvent from './HOCComponents/BindDomEvents';
import Paper from '@material-ui/core/Paper';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { Display1 } from './typography';

class VideoCarousel extends Component {
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
    const { videosourcesjson } = this.props;
    const { activeStep } = this.state;

    const videoSources = JSON.parse(videosourcesjson);

    const maxSteps = videoSources.length;
    const nextBtnIsDisabled = activeStep === maxSteps - 1;
    const prevBtnIsDisabled = activeStep === 0;

    return (
      <Fragment>
        <SwipeableViews
          axis='x'
          index={this.state.activeStep}
          enableMouseEvents
          className='video-carousel-content'
        >
          {videoSources.map((src, idx) => (
            <iframe
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
          className="carousel-nav"
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={() => this.handleNext()} disabled={nextBtnIsDisabled}>
              <img className={`carousel-nav-button-img ${nextBtnIsDisabled ? 'hidden' : ''}`} src="/static/images/next.svg"/>
            </Button>
          }
          backButton={
            <Button size="small" onClick={() => this.handleBack()} disabled={prevBtnIsDisabled}>
              <img className={`carousel-nav-button-img ${prevBtnIsDisabled ? 'hidden' : ''}`} src="/static/images/prev.svg"/>
            </Button>
          }
        />
        <div className="step-indicator">
          {activeStep + 1}/{maxSteps}
        </div>
      </Fragment>
    );
  }
}

export default VideoCarousel;
