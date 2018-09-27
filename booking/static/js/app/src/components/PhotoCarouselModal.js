import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

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

class PhotoCarouselModal extends Component {
  componentWillMount() {
    const {
      profile,
      getArtistPhotos,
    } = this.props;

    getArtistPhotos({artistId: profile.id});
  }

  render() {
    const { photos } = this.props;

    return (
      <div className="slider-section" style={{padding: '65px 20px 20px', maxWidth: 'calc(100vw - 40px)', position: 'relative'}}>
        <div id="photo-carousel" style={{width: '620px', maxWidth: 'calc(100vw - 40px)'}}>
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
)(PhotoCarouselModal);
