import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import * as PhotoActions from './../actions/photos';
import { PhotoCarousel } from './Carousels';
import { APOSTROPHE } from '../constants/unicodeCharacters';

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
  modalTitle: {
    position: 'absolute',
    top: theme.spacing.unit * 5,
    left: theme.spacing.unit * 6,
    fontSize: '16px',

    [theme.breakpoints.down('xs')]: {
      top: theme.spacing.unit * 4,
      left: theme.spacing.unit * 3,
    },
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
    const { classes, photos, profile } = this.props;

    // TODO: what to do about stage name too long (v likely on mobile)?
    return (
      <div className={classes.photoCarouselContainer}>
        <span className={classes.modalTitle}>{profile.stage_name}{APOSTROPHE}s Photos</span>
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
