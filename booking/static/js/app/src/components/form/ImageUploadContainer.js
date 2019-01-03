import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { MAX_CANVAS_IMAGE_WIDTH } from '../../constants/imageConstants';

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
            { maxWidth: MAX_CANVAS_IMAGE_WIDTH, canvas: true, orientation: true }
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
            children
        } = this.props;

        return (
            <div
                className={`image-upload-container ${className || ''}`}
            >
                <label
                    htmlFor={`addPicture-${id || 0}`}
                >
                   {
                    React.Children.map(children, child => {
                        return React.cloneElement(child, { onClick: () => {
                            child.onCLick && child.onCLick();
                        }})
                    })
                   }
                </label>
                <input
                    type="file"
                    className="addPicture"
                    id={`addPicture-${id || 0}`}
                    style={{display: 'none'}}
                    onChange={(e) => this.uploadImage(e)} />
            </div>
        )
    }
}

export default ImageUploadContainer;
