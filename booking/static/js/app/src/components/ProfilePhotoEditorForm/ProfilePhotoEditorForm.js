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

import { StyledCancelConfirm } from '../CancelConfirm';
import TextArea from '../form/TextArea';
import { Display1, H6 } from '../typography';
import ModalHeader from '../ModalHeader';
import ScaledElement from '../ScaledElement';

import PhotoEditor from '../PhotoEditor';

import styles from './styles';

const PreviewWithScale = (props) => {
  const { base64Img, classes, zoom, updateZoom } = props;

  return (
    <Grid item xs={6} className={classes.previewWithScale}>
      <img src={base64Img} className={classes.preview}/>
      <div style={{ marginLeft: '16px', flexGrow: 1, }}>
        <H6>Scale</H6>
        <Slider
          value={zoom}
          min={PhotoEditor.MIN_SCALE}
          max={PhotoEditor.MAX_SCALE}
          aria-labelledby="label"
          onChange={(e, value) => updateZoom(value)}
          className={classes.slider}
        />
      </div>
    </Grid>
  );
}

class EditBioForm extends Component {
  constructor(props) {
    super(props);
    props.updateBase64Img(props.image)

    autoBind(this);
  }

  updatePreviewImage() {
    this.props.updateBase64Img(this.photoEditor.getBase64Image())
  }

  async onConfirm() {
    const {
      onClickConfirm,
      closeDialog,
    } = this.props;

    const file = await this.photoEditor.getImage();
    onClickConfirm([file])
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
        base64Img,
        zoom,
        updateZoom,
    } = this.props;

    const cancel = onCancel && closeDialog;

    return (
      <div className={classNames(classes.container, classes.withFooter)}>
        <ModalHeader classes={classes}>Crop Photo</ModalHeader>
        <div className={classes.noScrollBody}>
          <ScaledElement
            className={classes.ratioContainer}
            render={(width, height) => (
                <PhotoEditor
                    ref={(ref) => this.photoEditor = ref}
                    image={image}
                    imageName={imageName}
                    scale={zoom}
                    onCancel={() => onCancel && onCancel()}
                    onChange={this.updatePreviewImage}
                    onScaleChange={updateZoom}
                    onImageLoad={this.updatePreviewImage}
                    width={width}
                    height={height}
                    className={classes.avatarEditor}
                />
              )}
              />
        </div>

          <Grid
              container
              direction='row'
              justify='space-between'
              alignContent='flex-end'
              alignItems='center'
              className={classes.footer}>
            <PreviewWithScale
                base64Img={base64Img}
                classes={classes}
                zoom={zoom}
                updateZoom={updateZoom} />
            <StyledCancelConfirm
                onClickCancel={this.onClickCancel}
                onClickConfirm={() => this.onConfirm()}
                isLoading={submitting} />
          </Grid>

      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  withStateHandlers(
    () => ({
      base64Img: '',
      zoom: 1,
    }),
    {
      updateBase64Img: () => base64Img => ({
        base64Img,
      }),
      updateZoom: () => zoom => ({
        zoom,
      })
    }
  )
)(EditBioForm);
