import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Edit } from './icons';

class EmptyState extends Component {
    constructor(props) {
      super(props);
      autoBind(this);
    }

    click() {
        // Definitely not the way to do this.
        document.querySelectorAll(this.props.triggerSelector)[0].click();
    }

    render() {

        const { copy } = this.props;

        return (
            <div className="profile-empty-state" onClick={this.click}>
                <p><Edit />&nbsp;&nbsp;{copy}</p>
            </div>
        )
    }
}

export default EmptyState;
