import React, { Component } from 'react';
import { compose } from 'redux';
import BindDomEvent from '../HOComponents/BindDomEvents';
import EditBioForm from './EditBioForm';
import autoBind from 'react-autobind';

class EditBioFormContainer extends Component {
    constructor() {
        super();
        autoBind(this);
    }

    onMount(open) {
        this.props.bindDomEvent({
            domId: 'open-edit-biography',
            eventType: 'click',
            callback: open
        })
    }

    render() {
        return <EditBioForm onMount={this.onMount} {...this.props}/>
    }
}

export default compose(
    BindDomEvent,
)(EditBioFormContainer)
