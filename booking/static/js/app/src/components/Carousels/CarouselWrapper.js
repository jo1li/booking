import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import MobileStepper from '@material-ui/core/MobileStepper';
import ButtonBase from '@material-ui/core/Button';
import isEqual from 'lodash/isEqual';
import { Next, Prev } from '../icons';
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
    const { classes, items, reverseColors } = this.props;

    return (
      <Fragment>
          { React.cloneElement(this.props.children, { activeStep }) }
        <CarouselNav
          classes={classes}
          activeStep={activeStep}
          maxSteps={items.length}
          reverseColors={reverseColors}
          handleNext={() => this.handleNext()}
          handleBack={() => this.handleBack()} />
      </Fragment>
    );
  }
}


// TODO: class calculations here are wacky
class CarouselNav extends Component {
  render() {
    const {
      classes,
      activeStep,
      maxSteps,
      handleNext,
      handleBack,
      reverseColors,
    } = this.props;

    if(!maxSteps) return null;

    const nextBtnIsDisabled = activeStep === maxSteps - 1;
    const prevBtnIsDisabled = activeStep === 0;

    let nextButtonClassName, prevButtonClassName;
    if(nextBtnIsDisabled) {
      if(reverseColors) {
        nextButtonClassName = classes.reverseColorsDisabledNavButtonIcon;
      } else {
        nextButtonClassName = classes.disabledNavButtonIcon;
      }
    }

    if(prevBtnIsDisabled) {
      if(reverseColors) {
        prevButtonClassName = classes.reverseColorsDisabledNavButtonIcon;
      } else {
        prevButtonClassName = classes.disabledNavButtonIcon;
      }
    }

    return (
      <Fragment>
        <MobileStepper
          className={reverseColors ? classes.reverseColorsCarouselNav : classes.carouselNav}
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <ButtonBase size="small" onClick={handleNext} className={reverseColors ? classes.reverseColorsCarouselNavButton : ''} disabled={nextBtnIsDisabled}>
              <Next className={classNames(classes.navButtonIcon, nextButtonClassName)}/>
            </ButtonBase>
          }
          backButton={
            <ButtonBase size="small" onClick={handleBack} className={reverseColors ? classes.reverseColorsCarouselNavButton : ''} disabled={prevBtnIsDisabled}>
              <Prev className={classNames(classes.navButtonIcon, prevButtonClassName)}/>
            </ButtonBase>
          }
        />
        <div className={reverseColors ? classes.reverseColorsStepIndicator : classes.stepIndicator}>
          {activeStep + 1} of {maxSteps}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  CONFIGS,
})

export default connect(mapStateToProps)(CarouselWrapper);
