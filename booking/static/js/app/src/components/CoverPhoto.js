import React from 'react';
import { connect } from 'react-redux';

const CoverPhoto = (props) => {
  const { photos, profile } = props;
  const coverPhoto = photos[profile.image_hero_id];
  if(!coverPhoto) return <div id="cover-photo" />;

  return <div id="cover-photo" style={{
    backgroundImage: `url(${coverPhoto.image})`,
  }} />
}

const mapStateToProps = (state, props) => ({
  photos: state.photos,
  profile: state.profile,
});

export default connect(mapStateToProps)(CoverPhoto);
