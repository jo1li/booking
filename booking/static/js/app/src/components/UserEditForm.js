import React, { Component } from 'react';
import { compose } from 'redux'
import CancelConfirm from './CancelConfirm';
import BindDomEvent from './HOCComponents/BindDomEvents';
import Typography from '@material-ui/core/Typography';
import FullScreenDialog from './modal/FullScreenDialog';
import { Display1 } from './typography';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);

    props.bindDomEvent({
        domId: 'open-edit-user-profile',
        eventType: 'click',
        callback: props.openDialog
    })
  }
  render() {
    const {
        closeDialog,
    } = this.props;

    return (
      <CancelConfirm
        onClickCancel={closeDialog}
      >
        <Display1>Edit Basic Info</Display1>
      </CancelConfirm>
    );
  }
}

export default compose(
    BindDomEvent,
    FullScreenDialog,
)(App);
