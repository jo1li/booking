import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import _ from 'lodash';

import Camera from 'react-feather/dist/icons/camera';
import ButtonBase from '@material-ui/core/ButtonBase';

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
  const { photos, profile, isEditable, classes } = props;
  const coverPhoto = photos[_.get(profile, 'image_hero.id', null)];
  // NB: cover-photo-bar needs to be here in order for sticky
  // artist card to work when there is no cover photo
  if(!coverPhoto) {
    return (
      <div id="cover-photo-empty">
        {isEditable && (
          <div class="cover-photo-cta">
            <ButtonBase><Camera size={22}/> Add a Cover Photo</ButtonBase>
          </div>
        )}
        <div id="cover-photo-bar">
          <div id="cover-photo-fade-placeholder"/>
        </div>
      </div>
    );
  }

  return (
    <div
      id="cover-photo"
      tabIndex={0}
      className={_.size(photos) ? classes.clickable : ''}
      style={{
        backgroundImage: `url(${coverPhoto.image})`,
    }}>
      <div id="cover-photo-bar">
        <div id="cover-photo-fade"></div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  photos: state.photos,
  profile: state.profile,
  isEditable: state.is_current_user,
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(CoverPhoto);
