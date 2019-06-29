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
const MIN_SCALE = 1;

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
 * When ReactPinchZoomPan's parent re-renders ReactPinchZoomPan
 * is re-rendered and the internal state is reset.
 * This means that the scale property is reset after each re-render of the parent
 * and if the user is in the middle of zooming, the image will snap back to its original size.
 * This component prevents re-render and so maintains the scale.
 */
class ReactPinchZoomPanContainer extends Component {
    shouldComponentUpdate(props, lastProps) {
        const hasChanged = prop => _.isEqual(props[prop], this.props[prop]);

        return [
            'scale',
            'width',
            'position'
        ]
        .map(hasChanged)
        .some(_.identity);
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
 *
 * Accessing functions such as getBase64Image, or getImage can be done by creating a ref for this component.
 * Example usage:
 *
 *  <PhotoEditor
 *       ref={(ref) => this.photoEditor = ref}
 *       image={image}
 *       imageName={imageName}
 *       scale={zoom}
 *       onCancel={() => onCancel && onCancel()}
 *       onChange={this.updatePreviewImage}
 *       onImageLoad={this.updatePreviewImage}
 *   />
 *
 *  Anywhere in the component that uses the PhotoEditor you can access the described functions like so:
 *
 *  this.photoEditor.getBase64Image()
 */
class PhotoEdit extends React.Component {
    static MAX_SCALE = MAX_SCALE;
    static MIN_SCALE = MIN_SCALE;

    constructor(props) {
        super(props);

        this.state = {
            scale: props.scale,
        };

        autoBind(this)
    }

    /**
     * Creates a base64 encoded string that can be used to preview images
     * @returns {String} base64 encoded string
     */
    getBase64Image() {
        const canvas = this.editor.getImage();
        return canvas.toDataURL('image/png');
    }

    /**
     * @return {Promise} resolves to a file object
     */
    async getImage() {
        const canvas = this.editor.getImage();
        const blob = await new Promise(resolve => (canvas.toBlob(resolve)));
        const imageFileData = {
            isFile: true,
            blob,
            fileName: this.props.imageName || 'image.png',
            preview: canvas.toDataURL('image/png'),
        }
        return imageFileData;
    }

    /**
     * @param {AvatarEditor}
     */
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
    render() {
        const configs = _.pick(this.props, AVATAR_PROPS);
        const {
            hide,
            onImageLoad,
            scale,
            width,
            initialScale,
            onScaleChange,
            onPositionChange,
            position,
            style,
            className,
        } = this.props;

        if (hide) {
            return <Fragment />;
        }

        return (
            <ReactPinchZoomPanContainer
                initialScale={scale}
                width={width}
                scale={scale}
                maxScale={MAX_SCALE}
                render={(obj) => {
                    // This function will only rerender if some subset of ReactPinchZoomPanContainer's attributes change.
                    // see `ReactPinchZoomPanContainer.shouldComponentUpdate`

                    let nextScale = parseFloat(obj.scale);

                    // This is throwing an warning 'Cannot update during an existing state transition' one time on mount
                    // but needs to be here to allow for mobile pinch zoom and external zooming.
                    onScaleChange && onScaleChange(nextScale)

                    const reducedWidth = configs.width - (configs.border * 2);
                    const reducedHeight = configs.height - (configs.border * 2);

                    if(reducedWidth < 0 || reducedHeight < 0) return <div/>;
                    return (

                        // Only some props will cause a re-render. please see shouldComponentUpdate.
                        <AvatarEditor
                            ref={(ref) => this.setEditorRef(ref)}
                            {...configs}
                            {...{ position }}
                            onImageChange={this.onChange()}
                            scale={nextScale}
                            width={reducedWidth}
                            position={position}
                            onPositionChange={value => onPositionChange && onPositionChange(value)}
                            height={reducedHeight}
                            className={className || ''}
                            onLoadSuccess={() => onImageLoad && onImageLoad()}
                        />
                )
            }}/>
        );
    }
}

PhotoEdit.defaultProps = {
    crossOrigin: 'anonymous',
    image: '',

    // width of the semi-transparent boarder in the Avatar editor
    border: 20,
    height: 310,
    width: 620,
    initialScale: 1,

    // this is not required
    scale: MIN_SCALE,
    borderRadius: 0,
    style: {},
    position: null,
}

export default PhotoEdit;
