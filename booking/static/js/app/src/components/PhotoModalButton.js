import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const PhotoModalButton = (props) => (
  <a
      href="#"
      className={`edit photo-modal-button ${_.size(props.photos) ? '' : 'hidden'}`} >
    <img src={`${CONFIGS.IMAGES_URL}/camera.svg`} alt="camera icon" />
    <span>{_.size(props.photos)}</span>
  </a>
);

const mapStateToProps = (state, props) => ({
  photos: state.photos,
  CONFIGS,
});

export default connect(mapStateToProps)(PhotoModalButton);
