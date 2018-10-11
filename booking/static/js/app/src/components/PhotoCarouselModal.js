import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import * as PhotoActions from './../actions/photos';
import { PhotoCarousel } from './Carousels';
import { MAX_IMAGE_WIDTH } from '../constants/carousels';

const mapStateToProps = (state, props) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getArtistPhotos: PhotoActions.getArtistPhotos,
  }, dispatch);
};

const LEFT_RIGHT_PADDING = 20;
const styles = theme => ({
  photoCarouselContainer: {
    margin: '0 auto',
    padding: `65px ${LEFT_RIGHT_PADDING}px 20px`,
    maxWidth: `calc(100vw - ${LEFT_RIGHT_PADDING * 2}px)`,
    position: 'relative',
  },
  photoCarousel: {
    width: `${MAX_IMAGE_WIDTH}px`,
    maxWidth: '100%',
  },
});

class PhotoCarouselModal extends Component {
  componentWillMount() {
    const {
      profile,
      getArtistPhotos,
    } = this.props;

    getArtistPhotos({artistId: profile.id});
  }

  render() {
    const { classes, photos } = this.props;

    return (
      <div className={classes.photoCarouselContainer}>
        <div className={classes.photoCarousel}>
          <PhotoCarousel photos={photos} />
        </div>
      </div>
    );
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(PhotoCarouselModal);
