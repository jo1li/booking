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
        console.log("onMount")
        this.props.bindDomEvent({
            domSelector: '#open-edit-biography',
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
