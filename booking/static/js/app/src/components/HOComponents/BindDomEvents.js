import React, { Component } from 'react';
import { bindDomEvent } from '../../utils/domHelpers';
import autoBind from 'react-autobind';

class BindEvents extends Component {
    constructor(props) {
        super(props);
        this.events = [];
        autoBind(this);
    }

    bind({domId, eventType, callback}) {
        const unbindFunction = bindDomEvent(domId, eventType, callback)
        this.events.push(unbindFunction);
    }

    unbind() {
        this.events.forEach(func => func());
    }

    componentWillUnmount() {
        this.unbind();
    }

    render() {
        const {
            children,
        } = this.props;

        const childrenWithProps = React.Children.map(children, child => {
            return React.cloneElement(child, { bindDomEvent: this.bind })
        });

        return childrenWithProps;
    }
}

const WrapBindEvents = WrappedComponent => props => {
        return (
            <BindEvents>
                <WrappedComponent {...props} />
            </BindEvents>
        )
    }


export default WrapBindEvents;
