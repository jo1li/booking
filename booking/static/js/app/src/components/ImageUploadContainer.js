import React, { Component } from 'react';

/**
 * Input that Handles uploading an image and correctly orienting the image.
 */
class ImageUploadContainer extends Component {
    /**
     * uploaded images on mobile are typically oriented incorrectly.
     * loadImage corrects the image orientation.
     * https://github.com/blueimp/JavaScript-Load-Image
     */
    orientImage(file, callback) {

        // Accessing the window needs to move
        window.loadImage(
            file,
            img => callback(img.toDataURL("image/png")),
            { maxWidth: 1200, canvas: true, orientation: true }
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
            id
        } = this.props;

        return (
            <div
                className={`image-upload-container ${className || ''}`}
            >
                <label
                    htmlFor={`addPicture-${id || 0}`}
                    onClick={onClick}
                >
                   {this.props.children}
                </label>
                <input type="file" className="addPicture" id={`addPicture-${id || 0}`}
                    onChange={(e) => this.uploadImage(e)} />
            </div>
        )
    }
}

export default ImageUploadContainer;