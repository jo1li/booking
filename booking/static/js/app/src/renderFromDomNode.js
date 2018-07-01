import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

class DomLifeCycleEvents extends Component {
    constructor () {
        super();
        this.state = {}
    }
    componentWillMount() {
        this.props.onMount && this.props.onMount(newState => this.setState(newState), this.state);
    }

    componentWillUnmount() {
        this.props.onUnMount && this.props.onUnMount(this.state);
    }

    render() {
        const {
            componentProps,
            Component
        } = this.props;
        return <Component {...componentProps} {...this.state}/>
    }
}

const RenderFromDomNode = ({ node, Component, onMount, onUnMount }) => {
    const domNode = document.getElementById(node);

    const mappedKeys = _.mapKeys(domNode.attributes, value => value.nodeName)
    const componentProps = _.mapValues(mappedKeys, value => domNode.getAttribute(value.nodeName))

    ReactDOM.render(
        <DomLifeCycleEvents
            onMount={onMount}
            onUnMount={onUnMount}
            componentProps={componentProps}
            Component={Component}
        />, domNode);
}

export default RenderFromDomNode;