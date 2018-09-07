import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../components/form/Button';
import {
  UploadButton,
  DeleteButton,
  AddButton
} from '../components/form/FabButton';
import RaisedButton from '../components/form/RaisedButton';

storiesOf('Buttons/Button', module)
  .add('Enabled', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
storiesOf('Buttons/RaisedButton', module)
  .add('Enabled', () => (
    <RaisedButton onClick={action('clicked')}>Hello Raised Button</RaisedButton>
  ))
storiesOf('Buttons/UploadButton', module)
  .add('Enabled', () => (
    <UploadButton onClick={action('clicked')} />
  ))
storiesOf('Buttons/AddButton', module)
  .add('Enabled', () => (
    <AddButton 
      onClick={action('clicked')} 
      mobileText="CONNECT"
    />
  ))
storiesOf('Buttons/DeleteButton', module)
  .add('Enabled', () => (
    <DeleteButton 
      mobileText="DISCONNECT"
      onClick={action('clicked')}
      disabled={false}
    />
  ))
  .add('Disabled', () => (
    <DeleteButton 
      mobileText="DISCONNECT"
      onClick={action('clicked')}
      disabled={true}
    />
  ))