import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const EditPhotosButtonText = (props) => (
  <span className={_.size(props.photos) ? 'hidden' : ''}>
    Add Photos
  </span>
);

const mapStateToProps = (state, props) => ({
  photos: state.photos,
});

export default connect(mapStateToProps)(EditPhotosButtonText);
