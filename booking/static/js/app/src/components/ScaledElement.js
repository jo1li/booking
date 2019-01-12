import React, { Component } from 'react';
import autobind from 'react-autobind';
import { withStateHandlers } from 'recompose';
import propTypes from 'prop-types';


class ScaledElement extends Component {
    componentWillMount() {
        autobind(this);
        this.setState({});
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateContainerDimensions, 0);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateContainerDimensions);
    }

    // This state won't be used, except to trigger re-render if changed.
    // There isn't a good way to use this as a value for rendering, because
    // the container isn't set until after the initial render.
    updateContainerDimensions() {
        if (!this.container) {
            return;
        }

        this.setState({
            containerWidth: this.container.offsetWidth,
            containerHeight: this.container.offsetHeight,
        });
    }

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
