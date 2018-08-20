import React, { Component } from 'react';
import { compose } from 'redux';
import BindDomEvent from '../HOComponents/BindDomEvents';
import VideoEditForm from './VideoEditForm';
import autoBind from 'react-autobind';

class VideoEditFormContainer extends Component {
    constructor() {
        super();

        autoBind(this);
    }

    onMount(open) {
        this.props.bindDomEvent({
            domSelector: '#open-edit-videos',
            eventType: 'click',
            callback: open
        })
    }

    render() {
        return <VideoEditForm onDialogMount={this.onMount} {...this.props}/>
    }
}

export default compose(
    BindDomEvent,
)(VideoEditFormContainer)
