import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import _ from 'lodash';

const styles = (theme) => ({
  notClickable: {
  },
  clickable: {
    opacity: '0.9',
    cursor: 'pointer',
    transition: 'opacity 0.3s',

    '&:hover, &:focus': {
      outline: 'none',
      opacity: '1.0',
    }
  },
})

const CoverPhoto = (props) => {
  const { photos, profile, classes } = props;
  const coverPhoto = photos[_.get(profile, 'image_hero.id', null)];
  if(!coverPhoto) return <div id="cover-photo" />;

  return (
    <div
      id="cover-photo"
      tabIndex={0}
      className={_.size(photos) ? classes.clickable : ''}
      style={{
        backgroundImage: `url(${coverPhoto.image})`,
    }}><div id="cover-photo-fade"></div></div>
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
