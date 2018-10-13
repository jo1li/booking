import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// TODO: get that src in here better, or use a react feathers icon
const PhotoModalButton = (props) => (
  <a
      href="#"
      className={`edit photo-modal-button ${_.size(props.photos) ? '' : 'hidden'}`} >
    <img src="/static/images/camera.svg" alt="camera icon" />
    <span>{_.size(props.photos)}</span>
  </a>
);

const mapStateToProps = (state, props) => ({
  photos: state.photos,
});

export default connect(mapStateToProps)(PhotoModalButton);
