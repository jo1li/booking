import React, { Component } from 'react';
import { compose } from 'redux'
import { Field, reduxForm, Form } from 'redux-form';
import { required } from 'redux-form-validators';
import CancelConfirm from './CancelConfirm';
import BindDomEvent from './HOComponents/BindDomEvents';
import FullScreenDialog from './modal/FullScreenDialog';
import Input from './form/Input';
import { Display1 } from './typography';

class UserEditForm extends Component {
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
    const { error, submitting, handleSubmit } = this.props;

    return (
      <CancelConfirm
        onClickCancel={closeDialog}
      >
        <Display1>Edit Basic Info</Display1>
          <form onSubmit={() => console.log('submitted')}>
            <Field
              component={Input}
              id="email"
              label="Email"
              labelClass="sr-only"
              name="email"
              placeholder="Email"
              type="email"
              validate={[required()]}
            />
            <Field
              component={Input}
              id="password"
              label="Password"
              labelClass="sr-only"
              name="password"
              placeholder="Password"
              type="password"
              validate={[required()]}
            />
          </form>
      </CancelConfirm>
    );
  }
}

UserEditForm = reduxForm({
  form: 'loginForm',
})(UserEditForm);


export default compose(
    BindDomEvent,
    FullScreenDialog,
)(UserEditForm);
