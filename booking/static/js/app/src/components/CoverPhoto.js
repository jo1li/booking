import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import _ from 'lodash';

const styles = (theme) => ({
  notClickable: {
  },
  clickable: {
    opacity: '0.94',
    cursor: 'pointer',

    animationDuration: '0.4s',
    animationName: 'transition-opacity-up',
    animationDirection: 'reverse',

    '&:hover, &:focus': {
      outline: 'none',
      opacity: '1.0',

      animationDuration: '0.4s',
      animationName: 'transition-opacity-up',
    }
  },
})

const CoverPhoto = (props) => {
  const { photos, profile, classes } = props;
  const coverPhoto = photos[profile.image_hero_id];
  if(!coverPhoto) return <div id="cover-photo" />;

  return (
    <div
      id="cover-photo"
      tabIndex={0}
      className={_.size(photos) ? classes.clickable : ''}
      style={{
        backgroundImage: `url(${coverPhoto.image})`,
    }} />
  );
}

const mapStateToProps = (state, props) => ({
  photos: state.photos,
  profile: state.profile,
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(CoverPhoto);
