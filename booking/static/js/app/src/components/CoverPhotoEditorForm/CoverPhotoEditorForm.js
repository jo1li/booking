import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, withStateHandlers } from 'recompose';
import classNames from 'classnames';
import {
  Field,
  reduxForm,
  getFormValues,
} from 'redux-form';
import autoBind from 'react-autobind';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/lab/Slider';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject, Scheduler } from 'rxjs';

import CancelConfirm from '../CancelConfirm';
import TextArea from '../form/TextArea';
import { Display1, H6 } from '../typography';
import ModalHeader from '../ModalHeader';
import ScaledElement from '../ScaledElement';
import { ArrowUp, ArrowDown } from '../icons';
import PhotoEditor from '../PhotoEditor';


import styles from './styles';

const Y_MAGNITUDE = 0.002;

const getChange = (magnitude, previous) => {
  const change = magnitude + previous;
  if (change >= 1 ) {
    return 1
  }

  if (change <= 0.1) {
    return 0.1;
  }

  return change;
}

class EditBioForm extends Component {
  constructor(props) {
    super(props);

    this.createVerticalPan();
    autoBind(this);
  }

  createVerticalPan() {
    const pan = () => this.props.panY(this.verticalPan.value)
    const isPanning = () => this.verticalPan.value !== false;

    // creates an interval that executes the function in .do
    // until the .takeWhile function is false
    const interval = Observable
                        .interval(0, Scheduler.animationFrame)
                        .do(pan)
                        .takeWhile(isPanning)

    // takes a value and emits that value.
    // when this.verticalPan.next(newValue)
    // the new value is emitted
    this.verticalPan = new BehaviorSubject(false);
    this.verticalPan
            .filter(isPanning)
            .do(() => interval.subscribe())
            .subscribe();
  }

  panUp() {
    this.verticalPan.next(Y_MAGNITUDE);
  }

  panDown() {
    this.verticalPan.next(-Y_MAGNITUDE);
  }

  cancelPan() {
    this.verticalPan.next(false);
  }

  async onConfirm() {
    const {
      onClickConfirm,
      closeDialog,
      positionY
    } = this.props;

    const file = await this.photoEditor.getImage();
    await onClickConfirm(file, positionY)
    closeDialog();
  }

  onClickCancel() {
     const {
      onClickCancel,
      closeDialog,
    } = this.props;

    onClickCancel && onClickCancel();
    closeDialog();
  }


  render() {
    const {
        closeDialog,
        submitting,
        handleSubmit,
        classes,
        submitSucceeded,
        image,
        imageName,
        onClickConfirm,
        onCancel,
        positionY,
        setPositionY,
    } = this.props;

    const cancel = onCancel && closeDialog;

    return (
      <div className={classNames(classes.container, classes.withFooter)}>
        <ModalHeader classes={classes}>Crop Photo</ModalHeader>
        <Grid container direction='row' className={classes.body}>
          <Grid item xs={8} sm={8} md={10} lg={10}>
            <Typography color="inherit" variant="subtitle1">Position the image</Typography>
            <Typography color="inherit" variant="body1" >Some areas may be cropped on larger screens.</Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={2} lg={2}>
            <Grid container direction='column' alignItems="flex-end">
              <ArrowUp
                onMouseDown={this.panDown}
                onTouchStart={this.panDown}
                onMouseUp={this.cancelPan}
                onTouchEnd={this.cancelPan}
              />
              <ArrowDown
                onMouseDown={this.panUp}
                onTouchStart={this.panUp}
                onMouseUp={this.cancelPan}
                onTouchEnd={this.cancelPan}
              />
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.scrollableBody}>
            <ScaledElement
              ratio={4.8}
              className={classes.ratioContainer}
              render={(width, height) => {
                return (
                  <PhotoEditor
                      ref={(ref) => this.photoEditor = ref}
                      image={image}
                      imageName={imageName}
                      onCancel={() => onCancel && onCancel()}
                      position={{
                        x: 0,
                        y: positionY
                      }}
                      style={{ cursor: 'move'}}
                      width={width}
                      height={height}
                      onPositionChange={value => setPositionY(value.y)}
                      border={0}
                  />
                )}}
              />
        </div>
        <CancelConfirm
            onClickCancel={this.onClickCancel}
            onClickConfirm={() => this.onConfirm()}
            isLoading={submitting}
            title={'Edit Biography'}
            className={classes.footer}
        />
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  withStateHandlers(
    () => ({

      // setting this initial value to 0.1 because any change
      // below 0.1 is not registered as a change in PhotoEditor
      positionY: 0.1
    }),
    {
      panY: ({ positionY }) => magnitude => ({
        positionY: getChange(magnitude, positionY)
      }),
      setPositionY: () => magnitude => ({
        positionY: magnitude
      }),

    }
  )
)(EditBioForm);
