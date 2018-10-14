import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import CONFIGS from '../configs';

const EditPhotosButton = (props) => (
  <Fragment>
    <img src={`${CONFIGS.IMAGES_URL}/edit-black.svg`} alt="edit icon" />
    <span className={`edit-photos-button-text ${_.size(props.photos) ? 'hidden' : ''}`}>
      Add Photos
    </span>
  </Fragment>
);

const mapStateToProps = (state, props) => ({
  photos: state.photos,
  CONFIGS,
});

export default connect(mapStateToProps)(EditPhotosButton);
