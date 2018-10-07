import React, { Component } from 'react';
import { compose } from 'redux';
import autoBind from 'react-autobind';
import BindDomEvent from '../HOComponents/BindDomEvents';
import ShowsEditForm from './ShowsEditForm';
import { getDomAttributesAsProps } from '../../utils/domHelpers';

class ShowsEditFormContainer extends Component {
  constructor() {
    super();
    this.state = {};
    autoBind(this);
  }

  mapDomAttributesToState(e) {
    const attributeObject = getDomAttributesAsProps(e.currentTarget);
    this.setState(attributeObject);
  }

  onMountCallback(open) {
    return (e) => {
      this.mapDomAttributesToState(e);
      open();
    }
  }

  onMount(open) {
    this.props.bindDomEvent({
      // TODO: normalize these names
      domSelector: '.open-show-edit-modal, #open-edit-events',
      eventType: 'click',
      callback: this.onMountCallback(open),
    });
  }

  render() {
    return <ShowsEditForm onDialogMount={this.onMount} {...this.props} {...this.state} />
  }
}

export default compose(
  BindDomEvent,
)(ShowsEditFormContainer);
