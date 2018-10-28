import React from 'react';
import { connect } from 'react-redux';
import ArtistCard from './ArtistCard';

const mapStateToProps = (state, props) => ({
  artist: state.profile.stage_name,
  tagline: state.profile.bio_short,
  image: state.profile.image,
  genres: ['rock','punk rock'], // TODO: Find where these come from
  hometown: state.profile.hometown,
  state: state.profile.state,
  website: state.profile.website,
  facebook: state.profile.facebook,
  facebookMetric: '', // TODO: ??
  instagram: state.profile.instagram,
  instagramMetric: '', // TODO: ??
  spotify: state.profile.spotify,
  spotifyMetric: '', // TODO: ??
  onTour: state.profile.on_tour,
  editable: true, // TODO: only if logged in
  inReview: false, // TODO: ??
});

export default connect(mapStateToProps)(ArtistCard);
