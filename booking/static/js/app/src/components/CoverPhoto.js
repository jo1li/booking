import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const CoverPhoto = (props) => {
  const { photos, profile } = props;
  const coverPhoto = photos[profile.image_hero_id];
  if(!coverPhoto) return <div id="cover-photo" />;

  return (
    <div
      id="cover-photo"
      tabIndex={0}
      style={{
        backgroundImage: `url(${coverPhoto.image})`,
    }} />
  );
}

const mapStateToProps = (state, props) => ({
  photos: state.photos,
  profile: state.profile,
});

export default connect(mapStateToProps)(CoverPhoto);
