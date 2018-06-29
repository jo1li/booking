import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { Field, reduxForm, Form } from 'redux-form';
import { required } from 'redux-form-validators';
import Grid from '@material-ui/core/Grid';
// import autobind from 'react-autobind';
import CancelConfirm from '../CancelConfirm';
import BindDomEvent from '../HOComponents/BindDomEvents';
import FullScreenDialog from '../modal/FullScreenDialog';
import Input from '../form/Input';
import { Display1 } from '../typography';
import InputButtons from './InputButtons';
import { ExpandMore } from '../icons';
import {
  UploadButton,
  DeleteButton,
  AddButton,
} from '../form/FabButton';
import { Caption } from '../typography';
import AdjustButton from './AdjustButton';
import Select from '../form/Select';
import TextArea from '../form/TextArea';
import TextField from '@material-ui/core/TextField';

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
      <form onSubmit={() => console.log('submitted')}>
        <CancelConfirm
            onClickCancel={closeDialog}
        >
          <Display1>Edit Basic Info</Display1>
          <Grid container spacing={24} direction="row">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Caption>PICTURE AVATAR</Caption>
            </Grid>
             <InputButtons
                component={Input}
                id="email"
                label="Email"
                labelClass="sr-only"
                name="email"
                placeholder="Email"
                type="email"
                validate={[required()]}
              >
                <UploadButton/>
              </InputButtons>
             <InputButtons
                component={Input}
                id="email"
                label="Email"
                labelClass="sr-only"
                name="email"
                placeholder="Email"
                type="email"
                validate={[required()]}
              >
                <AddButton/>
                <DeleteButton/>
              </InputButtons>
             <InputButtons
                component={Input}
                id="email"
                label="Email"
                labelClass="sr-only"
                name="email"
                placeholder="Email"
                type="email"
                validate={[required()]}
              >
                <AddButton/>
                <DeleteButton/>
              </InputButtons>
             <InputButtons
                component={Input}
                id="email"
                label="Email"
                labelClass="sr-only"
                name="email"
                placeholder="Email"
                type="email"
                validate={[required()]}
              >
                <AddButton/>
                <DeleteButton/>
              </InputButtons>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <Caption>HOME TOWN</Caption>
              <Field
                  component={Select}
                  id="state"
                  label="state"
                  labelClass="sr-only"
                  name="state"
                  placeholder="state"
                  type="select"
                  items={['one', 'two', 'three']}
                  validate={[required()]}
                  IconComponent={ExpandMore}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Caption>STATE</Caption>
              <Field
                  component={Select}
                  id="state"
                  label="state"
                  labelClass="sr-only"
                  name="state"
                  placeholder="state"
                  type="select"
                  items={['one', 'two', 'three']}
                  validate={[required()]}
                  IconComponent={ExpandMore}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Caption>GENRE</Caption>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Field
                  component={Select}
                  id="state"
                  label="state"
                  labelClass="sr-only"
                  name="state"
                  placeholder="state"
                  type="select"
                  items={['one', 'two', 'three']}
                  validate={[required()]}
                  IconComponent={ExpandMore}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Field
                  component={Select}
                  id="state"
                  label="state"
                  labelClass="sr-only"
                  name="state"
                  placeholder="state"
                  type="select"
                  items={['one', 'two', 'three']}
                  validate={[required()]}
                  IconComponent={ExpandMore}
                />
              </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Field
                  component={Select}
                  id="state"
                  label="state"
                  labelClass="sr-only"
                  name="state"
                  placeholder="state"
                  type="select"
                  items={['one', 'two', 'three']}
                  validate={[required()]}
                  IconComponent={ExpandMore}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Caption>WEBSITE</Caption>
                <Field
                  component={Input}
                  id="website"
                  label="website"
                  labelClass="sr-only"
                  name="website"
                  placeholder="website"
                  type="text"
                  validate={[required()]}
                />
            </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Caption>WEBSITE</Caption>
                <Field
                  component={Input}
                  id="website"
                  label="website"
                  labelClass="sr-only"
                  name="website"
                  placeholder="website"
                  type="textarea"
                  validate={[required()]}
                />
            </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Caption>WEBSITE</Caption>
                <Field
                  component={TextField}
                  id="website"
                  label="website"
                  name="website"
                  placeholder="website"
                  type="textarea"
                  validate={[required()]}
                  multiline
                  fullWidth
                />
            </Grid>
             <Field
                  component={TextField}

                  multiline
                  fullWidth
                />
            <TextField multiline fullWidth rows={6}/>
          </Grid>
        </CancelConfirm>
      </form>
    );
  }
}



UserEditForm = compose(
    BindDomEvent,
    FullScreenDialog,
)(UserEditForm);

UserEditForm = reduxForm({
  form: 'loginForm',
})(UserEditForm);

export default connect()(UserEditForm);
/*
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { required } from 'redux-form-validators';
import autobind from 'react-autobind';


export class LoginForm extends React.Component {
  static propTypes = {
    submitting: PropTypes.bool,
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    submitting: false,
    error: '',
  }

  constructor(props) {
    super(props);

    autobind(this);
  }

  submit (values, dispatch) {
    return dispatch(login(values));
  }

  render() {
    const { error, submitting, handleSubmit } = this.props;

    return (
      <div className="row">
        <div className="col">
          <Gate permitted={!!error}>
            <div className="alert alert-danger">{error}</div>
          </Gate>
          <Form className="row justify-content-center" onSubmit={handleSubmit(this.submit)}>
            <Field
              containerClass="col col-sm-5"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              component={FormField}
              id="email"
              label="Email"
              labelClass="sr-only"
              name="email"
              placeholder="Email"
              type="email"
              validate={[required()]}
            />
            <Field
              containerClass="col col-sm-5"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              component={FormField}
              id="password"
              label="Password"
              labelClass="sr-only"
              name="password"
              placeholder="Password"
              type="password"
              validate={[required()]}
            />
            <Button type="submit" color="primary" className="h-100" disabled={submitting}>Log In</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'loginForm',
})(LoginForm);*/
