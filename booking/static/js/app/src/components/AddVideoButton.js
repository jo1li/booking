import React, { Component } from 'react';
import { compose } from 'redux';
import autoBind from 'react-autobind';

import AddButton from './form/FabButton';

export default class AddVideoButton extends Component {
    constructor() {
        super();
        autoBind(this);
    }

    render() {
        return <AddButton mobileText="Add a Video!!1!" />
    }
}

