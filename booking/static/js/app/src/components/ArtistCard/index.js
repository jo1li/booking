import React from 'react';
import { connect } from 'react-redux';
import ArtistCard from './ArtistCard';

// TODO: Do social stats exist yet? Not bootstrapping in profile yet.
const mapStateToProps = (state, props) => ({
  profile: state.profile,
  editable: true, // TODO: only if logged in
  inReview: false, // TODO: ??
});

export default connect(mapStateToProps)(ArtistCard);
