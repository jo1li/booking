import React, { Fragment, Component } from "react";
import _ from 'lodash';
import autoBind from 'react-autobind';
import AvatarEditor from 'react-avatar-editor';
import { ReactPinchZoomPan } from 'react-pinch-zoom-pan';

 const AVATAR_PROPS = [
    'crossOrigin',
    'image',
    'border',
    'height',
    'width',
    'scale',
    'borderRadius',
    'style',
 ]

// maximum scale the image can be zoomed to.
// initial scale is 1
const MAX_SCALE = 3;


/**
 * Returns new object of default values with
 * values from newValuesObj overwritting default values.
 * Only keys in defaultsObj are passed from newValuesObj
 * to return obj
 *
 * Does not maintain object key order.
 */
function getDefaults(defaultsObj, newValuesObj) {
    const newValues = _.pick(newValuesObj, _.keys(defaultsObj));
    return _.defaults(newValues, defaultsObj);
}

/**
 * Creates a function that creates a setTimeout.
 * Each time the returned function is called if there exists a
 * setTimeout the current setTimeout will be canceled and a new one created
 *
 * @param {Function} func callback function
 * @param {Number} timeout - millisecond timer
 *
 * @return {Function}
 */
const delay = (func, timeout) => {
    let currentTimer = null;
    return () => {
        if (currentTimer) {
            clearTimeout(currentTimer);
        }

        currentTimer = setTimeout(func, timeout);
    }
}

/**
 * Takes image and creates a file object
 *
 * @param {String} url - base64 string
 * @param {String} filename - name of the file
 * @param {String} mimeType - ex image/png
 *
 * @return {Promise} - resolves to file object
 */
const urltoFile = (url, filename, mimeType) =>
        fetch(url)
            .then(res =>  res.arrayBuffer())
            .then(buf => new File([buf], filename, {type:mimeType}))

/**
 * When ReactPinchZoomPan's parent re-renders ReactPinchZoomPan
 * is re-rendered and the state the internal state is reset. This
 * means that the scale property is reset after each re-render of the parent
 * and in the middle of pinching the image snaps back to the original size.
 * This component prevents re-render and so maintains the scale.
 */
class ReactPinchZoomPanContainer extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <ReactPinchZoomPan {...this.props} />
    }
}

/**
 * This editor is using two react libs to get:
 * 1. the ability to upload and change an image and extract the resulting image.
 * 2. the pinch zoom and panning touch events for mobile.
 *
 * React-avatar-editor takes care of the ability to edit the image and touch panning.
 * It uses canvas to dispaly and edit the photo.
 *
 * React-pinch-zoom-pan takes care of pinch zoom.
 */
class PhotoEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scale: props.scale,
        };

        autoBind(this)
    }

    /**
     * @returns {String} base64 encoded string
     */
    getBase64Image() {
        if (this.editor) {

            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            const canvas = this.editor.getImage()

            // If you want the image resized to the canvas size (also a HTMLCanvasElement)
            // const canvasScaled = this.editor.getImageScaledToCanvas()

            // creates a png
            return canvas.toDataURL("image/png");
        }
    }

    /**
     * @param {String} src base64 encoded string
     *
     * @returns {Promise} resolves to a file object
     */
    getBlobSrc(src) {
        return urltoFile(src, this.props.imageName, 'image/png')
    }

    /**
     * @return {Promise} resolves to an object containing a 'file' and 'src'.
     * 'file' is a file object
     * 'src' is a base64 encoded string
     */
    getImage() {
        const src = this.getBase64Image();
        return this.getBlobSrc(src).then(file => ({
            src,
            file,
        }));
    }

    setEditorRef(editor) {
        this.editor = editor;
    }

    /**
     * If this.getBase64Image is called on every onChange event
     * performance of the editor suffers. This function does not fire
     * this.props.onChange until the user has stopped interacting with
     * the PhotoEditor for the delayTimeout.
     */
    onChange() {
        if (this.delayedOnChange) {
            return this.delayedOnChange;
        }

        const { onChange } = this.props;

        if (!onChange) {
            return;
        }

        this.delayedOnChange = delay(() => {
            onChange && onChange(this.getImage())
        }, 200)

        return this.delayedOnChange;
    }


    // ReactPinchZoomPan is just being used for scaling with pinch gesture
    // TODO pinch zoom resets scale to 1 on the start of pinch zoom. it should maintian its scale
    render() {
        const configs = _.pick(this.props, AVATAR_PROPS);
        const {
            hide,
        } = this.props;

        if (hide) {
            return <Fragment />;
        }

        return (
            <ReactPinchZoomPanContainer
                initialScale={configs.scale}
                maxScale={MAX_SCALE}
                render={(obj) => {
                    let nextScale = parseFloat(obj.scale);

                    return (
                        <AvatarEditor
                            ref={(ref) => this.setEditorRef(ref)}
                            {...configs}
                            onImageChange={this.onChange()}
                            scale={nextScale}
                        />
                )
            }}/>
        );
    }
}

PhotoEdit.defaultProps = {
    crossOrigin: 'anonymous',
    image: '',

    // width of the semi-transparent boarder
    border: 20,
    height: 250,
    width: 620,
    scale: 1,
    borderRadius: 0,
    style: {}
}

export default PhotoEdit;
