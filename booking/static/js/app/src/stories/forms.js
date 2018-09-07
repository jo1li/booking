import React from 'react';
import { Provider } from './provider';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../components/form/Button';
import UserEditFormContainer from '../components/UserEditForm/UserEditFormContainer';


storiesOf('Forms/UserEditForm', module)
  .addDecorator(story => <Provider story={story()}/>)
  .add('Basic', () => (
    <div>
      <Button id="open-edit-user-profile">Edit Profile</Button>
      <UserEditFormContainer
        id="user-edit-form" 
        musicianid="1" 
        stage_name="Opus" 
        image="https://res.cloudinary.com/opus-dev/image/upload/v1/media/_0004_Layer_8_ehmuq4" 
        facebook="https://www.facebook.com/opuslivemusic/" 
        instagram="https://www.instagram.com/chrishnry/" 
        spotify="https://open.spotify.com/artist/54tv11ndFfiqXiR03PwdlB" 
        hometown="New York City" 
        genres="Pop, Punk, Rock" 
        state="NY" 
        website="www.opuslive.io" 
        bio_short="We're pretty good."
      />
    </div>
  ));