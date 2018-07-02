import React, { Component } from 'react';
import { compose } from 'redux';
import BindDomEvent from '../HOComponents/BindDomEvents';
import UserEditForm from './UserEditForm';
import autoBind from 'auto-bind';

class UserEditFormContainer extends Component {
    constructor() {
        super();

        autoBind(this);
    }

    onMount(open) {
          this.props.bindDomEvent({
            domId: 'open-edit-user-profile',
            eventType: 'click',
            callback: open
        })
    }

    render() {
        return <UserEditForm onMount={this.onMount} {...this.props}/>
    }
}

export default compose(
    BindDomEvent,
)(UserEditFormContainer)