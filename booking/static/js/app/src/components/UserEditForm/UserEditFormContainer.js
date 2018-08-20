import React, { Component } from 'react';
import { compose } from 'redux';
import BindDomEvent from '../HOComponents/BindDomEvents';
import UserEditForm from './UserEditForm';
import autoBind from 'react-autobind';

class UserEditFormContainer extends Component {
    constructor() {
        super();

        autoBind(this);
    }

    onMount(open) {
          this.props.bindDomEvent({
            domSelector: '#open-edit-user-profile',
            eventType: 'click',
            callback: open
        })
    }

    render() {
        return <UserEditForm onDialogMount={this.onMount} {...this.props}/>
    }
}

export default compose(
    BindDomEvent,
)(UserEditFormContainer)