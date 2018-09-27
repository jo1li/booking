import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import boundToOpenElement from './modal/boundToOpenElement';
import FullScreenDialog from './modal/FullScreenDialog';
import * as PhotoActions from './../actions/photos';
import { PhotoCarousel } from './Carousels';

const mapStateToProps = (state, props) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getArtistPhotos: PhotoActions.getArtistPhotos,
  }, dispatch);
};

// TODO: am I sure I need max width on both of these?
const LEFT_RIGHT_PADDING = 20;
const styles = theme => ({
  photoCarouselContainer: {
    padding: `65px ${LEFT_RIGHT_PADDING}px 20px`,
    maxWidth: `calc(100vw - ${LEFT_RIGHT_PADDING * 2}px)`,
    position: 'relative',
  },
  photoCarousel: {
    width: '620px',
    maxWidth: `calc(100vw - ${LEFT_RIGHT_PADDING * 2}px)`,
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

    // TODO: Do I still need those hardcoded class names?
    return (
      <div className={`slider-section ${classes.photoCarouselContainer}`}>
        <div id={`photo-carousel ${classes.photoCarousel}`}>
          <PhotoCarousel photos={photos}/>
        </div>
      </div>
    );
  }
}

export default compose(
  boundToOpenElement('open-photo-carousel'),
  FullScreenDialog,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(PhotoCarouselModal);
