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
import sizeOf from 'image-size';
import http from 'http';
import url from 'url';

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

  if (change <= 0.002) {
    return 0.002;
  }

  return change;
}

// TODO: change this class name
class EditBioForm extends Component {
  state = {
    imageDimensions: {},
    positionerDimensions: {},
  }

  constructor(props) {
    super(props);

    this.createVerticalPan();
    autoBind(this);
  }

  componentDidMount() {
    this.setImageDimensions();
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

  /**
   * The avatar editor positionY range runs from:
   * half its height, in percent relative to image height,
   * to 1 - that number.
   *
   * The consumer runs from 0 to 1.
   * So this scales the values.
   */
  getScaledPositionY() {
    const {
      positionY,
    } = this.props;

    // TODO: be graceful if some state isn't ready yet
    const {
      imageDimensions,
      positionerDimensions,
    } = this.state;

    // TODO: handle very wide images
    const scale = positionerDimensions.width / imageDimensions.width;
    const scaledImageHeight = imageDimensions.height * scale;
    const positionerPercentHeight = positionerDimensions.height / scaledImageHeight;

    const slope = 1 / (1 - positionerPercentHeight);
    const modifiedPositionY = slope * (positionY - positionerPercentHeight / 2);
  }

  async onConfirm() {
    const {
      onClickConfirm,
      closeDialog,
    } = this.props;

    await onClickConfirm({positionY: this.getScaledPositionY});
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

  async getImageDimensions(imageURL) {
    const options = url.parse(imageURL);

    return new Promise((resolve) => {
      http.get(options, (response) => {
        const chunks = [];
        response.on('data', (chunk) => {
          chunks.push(chunk);
        }).on('end', () => {
          const buffer = Buffer.concat(chunks);
          resolve(sizeOf(buffer));
        });
      });
    });
  }

  setImageDimensions() {
    const imageURL = this.props.image;
    this.getImageDimensions(imageURL).then((dimensions) => {
      this.setState({imageDimensions: dimensions});
    })
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

    const imageDimensions = this.state.imageDimensions;
    const positionerDimensions = this.state.positionerDimensions;
    const setState = this.setState.bind(this); // TODO: yucky

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
                // TODO: this better
                if(!positionerDimensions.width) {
                  setTimeout(() => setState({positionerDimensions: {width, height}}), 0);
                }

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
      positionY: 0
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
