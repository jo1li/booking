import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const PhotoCountIndicator = (props) => (
  <span>{_.size(props.photos)}</span>
);

const mapStateToProps = (state, props) => ({
  photos: state.photos,
});

export default connect(mapStateToProps)(PhotoCountIndicator);
