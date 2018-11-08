import React from 'react';
import { Provider } from './provider';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ArtistCard from '../components/ArtistCard/ArtistCard';

storiesOf('ArtistCard', module)
  .addDecorator(story => <Provider story={story()}/>)
  .add('Basic', () => (
    <ArtistCard
      artist="The Rolling Stones"
      tagline="Pretty famous band you might've heard of."
      image="https://i.imgur.com/MT6POWY.jpg"
      genres={["rock","punk rock"]}
      hometown="Brooklyn"
      state="NY"
      website="https://google.com"
      facebook="https://www.facebook.com/opuslivemusic/"
      facebookMetric=""
      instagram=""
      instagramMetric=""
      spotify="https://open.spotify.com/artist/22bE4uQ6baNwSHPVcDxLCe"
      spotifyMetric="450"
      onTour={false}
      editable={false}
      inReview={false}
    />
  ))
  .add('On Tour', () => (
    <ArtistCard
      artist="The Rolling Stones"
      tagline="Pretty famous band you might've heard of."
      image="https://i.imgur.com/MT6POWY.jpg"
      genres={["rock","punk rock"]}
      hometown="Brooklyn"
      state="NY"
      website="https://google.com"
      facebook="https://www.facebook.com/opuslivemusic/"
      facebookMetric=""
      instagram=""
      instagramMetric=""
      spotify="https://open.spotify.com/artist/22bE4uQ6baNwSHPVcDxLCe"
      spotifyMetric="450"
      onTour={true}
      editable={false}
      inReview={false}
    />
  ))
  .add('Editable', () => (
    <ArtistCard
      artist="The Rolling Stones"
      tagline="Pretty famous band you might've heard of."
      image="https://i.imgur.com/MT6POWY.jpg"
      genres={["rock","punk rock"]}
      hometown="Brooklyn"
      state="NY"
      website="https://google.com"
      facebook="https://www.facebook.com/opuslivemusic/"
      facebookMetric=""
      instagram=""
      instagramMetric=""
      spotify="https://open.spotify.com/artist/22bE4uQ6baNwSHPVcDxLCe"
      spotifyMetric="450"
      onTour={true}
      editable={true}
      inReview={false}
    />
  ))
  .add('In Review', () => (
    <ArtistCard
      artist="The Rolling Stones"
      tagline="Pretty famous band you might've heard of."
      image="https://i.imgur.com/MT6POWY.jpg"
      genres={["rock","punk rock"]}
      hometown="Brooklyn"
      state="NY"
      website="https://google.com"
      facebook="https://www.facebook.com/opuslivemusic/"
      facebookMetric=""
      instagram=""
      instagramMetric=""
      spotify="https://open.spotify.com/artist/22bE4uQ6baNwSHPVcDxLCe"
      spotifyMetric="450"
      onTour={true}
      editable={false}
      inReview={true}
    />
  ))