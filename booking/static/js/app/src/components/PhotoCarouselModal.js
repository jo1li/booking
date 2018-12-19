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

const styles = theme => ({
  photoCarouselContainer: {
    height: '100%',
    padding: `94px 88px 0`,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      padding: '94px 0 0',
    }
  },
  photoCarousel: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative', // So children can position relative to bottom
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
