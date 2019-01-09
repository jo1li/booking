import React, { Component, Fragment } from 'react';
import autoBind from 'react-autobind';
import {
  Field,
  reduxForm,
  getFormValues,
} from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import DropZone from "react-dropzone";
import FormControl from '@material-ui/core/FormControl';
import _ from 'lodash';
import UploadButton from '../UserEditForm/UploadButton';
import { orientImage } from '../../helpers/imageHelpers';
import { Camera } from '../icons';


const styles = (theme) => ({
    dropZone: {
        display: 'flex',
    },
    uploadButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '16px',
        height: '64px',
    },
    emptyImagePreview: {
        backgroundColor: '#F5F9FA',
        display: 'inline-flex',
        // Center camera icon
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePreview: {
        height: '64px',
        width: '100px',
    }
});

const EmptyImagePreview = ({classes}) => (
    <div className={classNames(classes.emptyImagePreview, classes.imagePreview)}>
        <Camera size={22} />
    </div>
)

// Based on ../SignupForm/UploadDropZone
const ImagePreview = ({ image, imageName, classes }) => {
    if(!image) {
        return <EmptyImagePreview classes={classes} />;
    }

    return <img src={image} alt={imageName} className={classes.imagePreview} />;
};

// Based on ../SignupForm/UploadDropZone
// TODO: Merge the two once the design is more consistent.
const DropZoneField = ({
    handleOnDrop,
    input,
    image,
    imageName,
    label,
    classes,
    meta: { error, touched }
}) => (
    <Fragment>
        <DropZone
            accept="image/jpeg, image/png"
            className={classNames("upload-container", classes.dropZone)}
            onDrop={file => orientImage(file[0], base64Image => {
            handleOnDrop({
                ...file,
                preview: base64Image
            })
          })}
        >
            <ImagePreview image={image} imageName={imageName} classes={classes} />
            <div className={classes.uploadButtonContainer}>
                <UploadButton />
            </div>
        </DropZone>
        {touched && error && <div>{error}</div>}
    </Fragment>
);

const StyledDropZoneField = withStyles(styles)(DropZoneField);


/**
 * Input that Handles uploading an image and correctly orienting the image.
 *
 * When uploading the file object make sure to use a formData object
 */
class ImageUploadContainer extends Component {
    constructor() {
        super();
        autoBind(this);
    }

    /**
     * uploaded images on mobile are typically oriented incorrectly.
     * loadImage corrects the image orientation.
     * https://github.com/blueimp/JavaScript-Load-Image
     */
    orientImage(file, callback) {
        window.loadImage(
            file,
            img => callback(img.toDataURL("image/png")),
            { canvas: true, orientation: true }
        );
    }

    /**
     * Passes the uploaded file object as well as a
     * base 64 of the image to the onUpload callback
     */
    uploadImage(e) {
        const { onUpload } = this.props;
        let file = e.target.files[0]
        this.orientImage(file, (src) => {
            onUpload({
                file,
                name: file.name,
                src
            })
        });
    }

    render() {
        const {
            className,
            onClick,

            // requires a unique id if two or more
            // upload containers are present on a page
            id,
            children,
            classes,
            currentValues,
            onDrop
        } = this.props;


        return (
            <FormControl className={`image-upload-container ${className || ''}`} fullWidth>
                <Field
                    name="image"
                    component={StyledDropZoneField}
                    type="file"
                    image={currentValues.image}
                    imageName={_.get(currentValues.imageFile, 'name')}
                    handleOnDrop={onDrop}
                />
            </FormControl>
        );
    }
}

export default ImageUploadContainer;
