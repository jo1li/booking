import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import CONFIGS from '../../configs';

class CarouselWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {activeStep: 0};
  }

  handleNext() {
    // this.refreshIframe(this.state.activeStep);
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack() {
    // this.refreshIframe(this.state.activeStep);
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  render() {
    const { activeStep } = this.state;
    const { classes, itemCount } = this.props;

    return (
      <Fragment>
          { React.cloneElement(this.props.children, { activeStep }) }
        <CarouselNav
          classes={classes}
          activeStep={activeStep}
          maxSteps={itemCount}
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
