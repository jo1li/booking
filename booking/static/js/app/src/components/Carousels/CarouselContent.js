import React, { Component } from 'react';
import autoBind from 'react-autobind';
import SwipeableViews from 'react-swipeable-views';
import { MAX_IMAGE_WIDTH, MAX_IMAGE_HEIGHT } from '../../constants/carousels';
import { getMaxSizeImageURL } from '../../helpers/imageHelpers';

class IframeCarouselContent extends Component {
  componentWillMount() {
    autoBind(this);
  }

  componentWillReceiveProps(props) {
    const { activeStep } = this.props;

    // When we switch to a new step in the carousel, stop any audio/video
    // playing in this step.
    if(activeStep !== props.activeStep) {
      this.refreshIframe(activeStep);
    }
  }

  onChangeIndex(newIdx) {
    this.props.changeActiveStep(newIdx);
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
        onChangeIndex={this.onChangeIndex}
        enableMouseEvents
        className={className}
      >
        {iframeSources.map((src, idx) => (
          <iframe
            title={src}
            className={`${classes.iframe} ${idx}`}
            ref={`iframe-${idx}`}
            frameBorder="0"
            seamless="seamless"
            key={idx}
            src={src} />
        ))}
      </SwipeableViews>
    );
  }
}

class PhotoCarouselContent extends Component {
  componentWillMount() {
    autoBind(this);
  }

  onChangeIndex(newIdx) {
    this.props.changeActiveStep(newIdx);
  }

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
        onChangeIndex={this.onChangeIndex}
        enableMouseEvents
        className={className}
      >
        {photoSources.map((src, idx) => (
          <img
            className={classes.photo}
            key={idx}
            src={getMaxSizeImageURL(src, {
              maxWidth: MAX_IMAGE_WIDTH,
              maxHeight: MAX_IMAGE_HEIGHT
            })}
            alt={src}
            title={src} />
        ))}
      </SwipeableViews>
    );
  }
}

export { IframeCarouselContent, PhotoCarouselContent };
