import React, { Component, Fragment } from 'react';
import SwipeableViews from 'react-swipeable-views';

class IframeCarouselContent extends Component {
  componentWillReceiveProps(props) {
    const { activeStep } = this.props;

    // When we switch to a new step in the carousel, stop any audio/video
    // playing in this step.
    if(activeStep !== props.activeStep) {
      this.refreshIframe(activeStep);
    }
  }

  refreshIframe(idx) {
    const iframe = this.refs[`iframe-${idx}`];
    const src = iframe.src;
    iframe.src = '';
    iframe.src = src;
  }

  render() {
    const {
      className,
      classes,
      iframeSources,
      activeStep,
    } = this.props;

    return (
      <SwipeableViews
        axis='x'
        index={activeStep}
        enableMouseEvents
        className={className}
      >
        {iframeSources.map((src, idx) => (
          <iframe
            className={`${classes.iframe} ${idx}`}
            ref={`iframe-${idx}`}
            frameBorder="0"
            seamless="seamless"
            key={idx}
            src={src}
            alt={src}
            title={src} />
        ))}
      </SwipeableViews>
    );
  }
}

class PhotoCarouselContent extends Component {
  render() {
    const {
      className,
      classes,
      photoSources,
      activeStep,
    } = this.props;

    return (
      <SwipeableViews
        axis='x'
        index={activeStep}
        enableMouseEvents
        className={className}
      >
        {photoSources.map((src, idx) => (
          <img
            className={classes.photo}
            frameBorder="0"
            seamless="seamless"
            key={idx}
            src={src} />
        ))}
      </SwipeableViews>
    );
  }
}

export { IframeCarouselContent, PhotoCarouselContent };
