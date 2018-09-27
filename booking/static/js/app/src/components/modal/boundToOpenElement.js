import React, { Component } from 'react';
import BindDomEvent from '../HOComponents/BindDomEvents';
import autoBind from 'react-autobind';

const boundToOpenElement = (domSelector) => (BodyComponent) => {
  class BoundComponent extends Component {
    constructor() {
      super();
      console.log(domID);
      autoBind(this);
    }

    onMount(open) {
      this.props.bindDomEvent({
        domSelector: domSelector,
        eventType: 'click',
        callback: () => {debugger; open();},
      })
    }

    render() {
      return <BodyComponent onMount={this.onMount} {...this.props}/>
    }
  }

  return BindDomEvent(BoundComponent);
}

export default boundToOpenElement;
