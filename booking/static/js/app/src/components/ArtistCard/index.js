import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ArtistCard from './ArtistCard';
import { FullScreenDialog } from '../Dialog';

// TODO: Do social stats exist yet? Not bootstrapping in profile yet.
const mapStateToProps = (state, props) => ({
  profile: state.profile,
  isEditable: state.is_current_user,
  isInReview: false, // TODO: Make this dynamic and handle in-review styling when review flow exists.
});

export default compose(
  connect(mapStateToProps),
  FullScreenDialog,
)(ArtistCard);
