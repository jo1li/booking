import React, { Component } from 'react';
import { withStateHandlers } from 'recompose';
import propTypes from 'prop-types';

class ScaledElement extends Component {
    getDimensions() {
        if (!this.container) {
            return {};
        }

        const {
            ratio,
        } = this.props;

        const width = this.container.offsetWidth;

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
        } = this.getDimensions();

        return (
          <div className={className} ref={ref => this.container = ref}>
            {render(width, height)}
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

    // defaults to 2:1
    ratio: 2
}

export default ScaledElement;