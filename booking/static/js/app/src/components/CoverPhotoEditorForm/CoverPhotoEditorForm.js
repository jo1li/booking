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
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
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
    isSubmitting: false,
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
    return slope * (positionY - positionerPercentHeight / 2);
  }

  async onConfirm() {
    const {
      onClickConfirm,
      closeDialog,
    } = this.props;

    this.setState({ isSubmitting: true });
    await onClickConfirm({positionY: this.getScaledPositionY()});
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
        width,
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

    // TODO: don't tack styles onto icons; just make them buttons or w/e
    return (
      <div className={classNames(classes.container, classes.withFooter)}>
        <ModalHeader classes={classes}>Crop Photo</ModalHeader>
        <Grid container direction='row' className={classes.body}>
          <Grid item xs={8} sm={8} md={10} lg={10}>
            <Typography color="inherit" variant="subtitle1">Position the image</Typography>
            <Typography color="inherit" variant="body1" >
              {
                width === 'xs' ?
                'Use arrows to position the photo.' :
                'Click and drag photo to position.'
              }
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={2} lg={2}>
            <Grid container direction='column' alignItems="flex-end">
              <ButtonBase
                  onMouseDown={this.panDown}
                  onTouchStart={this.panDown}
                  onMouseUp={this.cancelPan}
                  onTouchEnd={this.cancelPan}
                  disableRipple={true} >
                <ArrowUp/>
              </ButtonBase>
              <ButtonBase
                  onMouseDown={this.panUp}
                  onTouchStart={this.panUp}
                  onMouseUp={this.cancelPan}
                  onTouchEnd={this.cancelPan} >
                <ArrowDown/>
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.scrollableBody}>
            <ScaledElement
              ratio={4.8}
              className={classes.ratioContainer}
              render={(width, height) => {

                // TODO: Is there a better way to handle this?
                // We need the dimensions in order to convert to the y-position
                // that the html needs (relative to top instead of relative to
                // middle), but can't call `setState` directly within `render`.
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
            isLoading={this.state.isSubmitting}
            title={'Edit Biography'}
            className={classes.footer}
        />
      </div>
    );
  }
}

export default compose(
  withWidth(),
  withStyles(styles),
  withStateHandlers(
    () => ({
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
