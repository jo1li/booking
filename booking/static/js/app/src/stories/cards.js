import React from 'react';
import { Provider } from './provider';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ArtistCard from '../components/ArtistCard/ArtistCard';

storiesOf('ArtistCard', module)
  .addDecorator(story => <Provider story={story()}/>)
  .add('Basic', () => (
    <ArtistCard
      profile={{
        id: 1,
        stage_name: "The Rolling Stones",
        bio_short: "Pretty famous band you might've heard of.",
        image: "https://i.imgur.com/MT6POWY.jpg",
        genres: [{name: "rock"},{name: "punk rock"}],
        hometown: "Brooklyn",
        state: "NY",
        website: "https://google.com",
        facebook: "https://www.facebook.com/opuslivemusic/",
        facebook_followers: null,
        instagram: null,
        instagram_followers: null,
        spotify: "https://open.spotify.com/artist/22bE4uQ6baNwSHPVcDxLCe",
        spotify_followers: "450",
        on_tour: false,
      }}
      editable={false}
      inReview={false}
    />
  ))
  .add('On Tour', () => (
    <ArtistCard
      profile={{
        id: 1,
        stage_name: "The Rolling Stones",
        bio_short: "Pretty famous band you might've heard of.",
        image: "https://i.imgur.com/MT6POWY.jpg",
        genres: [{name: "rock"},{name: "punk rock"}],
        hometown: "Brooklyn",
        state: "NY",
        website: "https://google.com",
        facebook: "https://www.facebook.com/opuslivemusic/",
        facebook_followers: null,
        instagram: null,
        instagram_followers: null,
        spotify: "https://open.spotify.com/artist/22bE4uQ6baNwSHPVcDxLCe",
        spotify_followers: "450",
        on_tour: true,
      }}
      editable={false}
      inReview={false}
    />
  ))
  .add('Editable', () => (
    <ArtistCard
      profile={{
        id: 1,
        stage_name: "The Rolling Stones",
        bio_short: "Pretty famous band you might've heard of.",
        image: "https://i.imgur.com/MT6POWY.jpg",
        genres: [{name: "rock"},{name: "punk rock"}],
        hometown: "Brooklyn",
        state: "NY",
        website: "https://google.com",
        facebook: "https://www.facebook.com/opuslivemusic/",
        facebook_followers: null,
        instagram: null,
        instagram_followers: null,
        spotify: "https://open.spotify.com/artist/22bE4uQ6baNwSHPVcDxLCe",
        spotify_followers: "450",
        on_tour: true,
      }}
      editable={true}
      inReview={false}
    />
  ))
  .add('In Review', () => (
    <ArtistCard
      profile={{
        id: 1,
        stage_name: "The Rolling Stones",
        bio_short: "Pretty famous band you might've heard of.",
        image: "https://i.imgur.com/MT6POWY.jpg",
        genres: [{name: "rock"}, {name: "punk rock"}],
        hometown: "Brooklyn",
        state: "NY",
        website: "https://google.com",
        facebook: "https://www.facebook.com/opuslivemusic/",
        facebook_followers: null,
        instagram: null,
        instagram_followers: null,
        spotify: "https://open.spotify.com/artist/22bE4uQ6baNwSHPVcDxLCe",
        spotify_followers: "450",
        on_tour: true,
      }}
      editable={false}
      inReview={true}
    />
  ))
