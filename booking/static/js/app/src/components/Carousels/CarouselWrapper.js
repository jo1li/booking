import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import isEqual from 'lodash/isEqual';
import CONFIGS from '../../configs';

class CarouselWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {activeStep: 0};
  }

  componentWillReceiveProps(newProps) {
    // If we modified the content of the carousel, reset to first video
    // instead of awkwardly showing whatever video is now at the previous
    // index, or using an index that is no longer in range.
    // TODO: What do to when all videos are removed?
    if(!isEqual(this.props.items, newProps.items)) {
      this.setState({activeStep: 0});
    }
  }

  handleNext() {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack() {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  render() {
    const { activeStep } = this.state;
    const { classes, items } = this.props;

    return (
      <Fragment>
          { React.cloneElement(this.props.children, { activeStep }) }
        <CarouselNav
          classes={classes}
          activeStep={activeStep}
          maxSteps={items.length}
          handleNext={() => this.handleNext()}
          handleBack={() => this.handleBack()} />
      </Fragment>
    );
  }
}

class CarouselNav extends Component {
  render() {
    const {
      classes,
      activeStep,
      maxSteps,
      handleNext,
      handleBack,
    } = this.props;

    if(maxSteps === 0) return null;

    const nextBtnIsDisabled = activeStep === maxSteps - 1;
    const prevBtnIsDisabled = activeStep === 0;

    return (
      <Fragment>
        <MobileStepper
          className={classes.carouselNav}
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={nextBtnIsDisabled}>
              <img
                alt="carousel next button"
                className={`${classes.navButtonIcon} ${nextBtnIsDisabled ? classes.hidden : ''}`}
                src={`${CONFIGS.IMAGES_URL}/next.svg`} />
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={prevBtnIsDisabled}>
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

export default connect(mapStateToProps)(CarouselWrapper);
