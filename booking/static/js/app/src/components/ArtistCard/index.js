import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ArtistCard from './ArtistCard';
import { FullScreenDialog } from '../Dialog';

// TODO: Do social stats exist yet? Not bootstrapping in profile yet.
const mapStateToProps = (state, props) => ({
  profile: state.profile,
  editable: true, // TODO: only if logged in
  inReview: false, // TODO: ??
});

export default compose(
  connect(mapStateToProps),
  FullScreenDialog,
)(ArtistCard);
