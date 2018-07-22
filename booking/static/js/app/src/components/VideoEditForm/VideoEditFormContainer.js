import React, { Component } from 'react';
import { compose } from 'redux';
import BindDomEvent from '../HOComponents/BindDomEvents';
import VideoEditForm from './VideoEditForm';
import autoBind from 'react-autobind';

class UserEditFormContainer extends Component {
    constructor() {
        super();

        autoBind(this);
    }

    onMount(open) {
          this.props.bindDomEvent({
            domId: 'open-edit-videos',
            eventType: 'click',
            callback: open
        })
    }

    render() {
        return <VideoEditForm onMount={this.onMount} {...this.props}/>
    }
}

export default compose(
    BindDomEvent,
)(UserEditFormContainer)
