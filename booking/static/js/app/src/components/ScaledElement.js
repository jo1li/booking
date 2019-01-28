import React, { Component } from 'react';
import { withStateHandlers } from 'recompose';
import propTypes from 'prop-types';

class ScaledElement extends Component {

    constructor() {
        super();

        this.state = {
            width: null,
            height: null,
        };
    }

    componentDidMount() {

        // its necessary to get the dimensions after mount
        // otherwise the width and height can be null.
        const {
            width,
            height,
        } = this.getDimensions();

         this.setState({
            width,
            height,
        })
    }

    getDimensions() {
        if (!this.container) {
            return {};
        }

        const {
            ratio,
        } = this.props;

        let width = this.container.offsetWidth;

        return {
            width,
            height: width / ratio,
        }
    }

    render() {
        const {
            className,
            render,
        } = this.props;

        const {
            width,
            height,
        } = this.state;

        return (
          <div className={className} ref={ref => this.container = ref}>
            { this.container ? render(width, height) : null }
          </div>
        )
    }
}

ScaledElement.propTypes = {

    // This is a render prop. pass jsx into this function to be rendered
    render: propTypes.func.isRequired,
    ratio: propTypes.number,
    className: propTypes.string,
}

ScaledElement.defaultProps = {

    // defaults to 25:16
    ratio: 25/16
}

export default ScaledElement;
