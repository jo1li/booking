import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, withStateHandlers } from 'recompose'
import {
  Field,
  reduxForm,
  getFormValues,
} from 'redux-form';
import autoBind from 'react-autobind';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/lab/Slider';
import { withStyles } from '@material-ui/core/styles';

import CancelConfirm from '../CancelConfirm';
import TextArea from '../form/TextArea';
import { Display1, H6 } from '../typography';

import PhotoEditor from '../PhotoEditor';

import styles from './styles';



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
      <div className={classes.container}>
        <Grid container spacing={24}>
          <Grid item className={classes.captionTop} xs={12} sm={12} md={12} lg={12}>
            <Display1 className={classes.caption} >Crop Photo</Display1>
          </Grid>
          <Grid item xs={12} lg={12}>
            <PhotoEditor
                ref={(ref) => this.photoEditor = ref}
                image={image}
                imageName={imageName}
                scale={zoom}
                onCancel={() => onCancel && onCancel()}
                onChange={this.updatePreviewImage}
                onScaleChange={updateZoom}
                onImageLoad={this.updatePreviewImage}
            />
          </Grid>
        </Grid>
        <Grid container direction='row' spacing={24}>
            <Grid item xs={3} lg={3}>
                <img src={base64Img} className={classes.preview}/>
            </Grid>
            <Grid item xs={4} lg={4}>
               <H6>Scale</H6>
               <Slider
                value={zoom}
                min={PhotoEditor.MIN_SCALE}
                max={PhotoEditor.MAX_SCALE}
                aria-labelledby="label"
                onChange={(e, value) => updateZoom(value)}
                className={classes.slider}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <CancelConfirm
                  onClickCancel={this.onClickCancel}
                  onClickConfirm={() => this.onConfirm()}
                  isLoading={submitting}
                  title={'Edit Biography'}
              />
            </Grid>
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
