import React, { Component } from 'react';
import { compose } from 'recompose'
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Hidden from '@material-ui/core/Hidden';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

import _ from 'lodash';

import { SmallDeviceFullScreenDialog } from '../Dialog/Dialog';
import ProfilePhotoEditorForm from '../ProfilePhotoEditorForm';
import ScrollShadows from '../ScrollShadows';
import { ArtistInfoFormSection, ProfilePhotoFormSection } from '../ArtistInfoFormSections';

import * as GenreActions from '../../actions/genres';
import sharedStyles from '../../sharedStyles/artistInfoFormsStyles.js';

const styles = theme => ({
  ...sharedStyles(theme),
  scrollableSection: {
    maxHeight: '100%', // for some reason doesn't work with just height
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 3 / 2, // To eat the negative margin in the grids
    },
  },
  floatingProfilePhotoSection: {
    position: 'absolute',
    left: theme.spacing.unit * 1.5,
    top: 0,
  },
  rigidProfilePhotoSection: {
    marginTop: theme.spacing.unit * 2,
  },
  form: {
    ...sharedStyles(theme).form,
    overflow: 'hidden',
    display: 'flex',
    position: 'relative',
    flexGrow: 1,
    marginTop: 0,
  },
});

class AristInfoForm extends Component {
  constructor() {
    super();

    autoBind(this);
  }

  componentWillMount() {
    this.props.getGenres();
  }

  openPhotoEditor(imageFile) {
    const {
      change,
      openDialog,
    } = this.props;

    openDialog(
      <ProfilePhotoEditorForm
        image={imageFile.preview}
        imageName={imageFile.name}
        onClickConfirm={file => change('image', file)} />
    )
  }

  render() {
    const { classes, currentValues, change, width, genres } = this.props;

    const genresForSelect = _.map(genres, genre => ({
      value: genre.name,
      label: genre.name
    }));

    return (
      <form className={classes.form}>
        <Hidden xsDown={true}>
          <Grid container direction='column' spacing={24} className={classes.floatingProfilePhotoSection}>
            <Grid item xs={12} sm={4}>
              <ProfilePhotoFormSection
                  classes={classes}
                  currentValues={currentValues}
                  openPhotoEditor={this.openPhotoEditor} />
            </Grid>
          </Grid>
        </Hidden>

        <ScrollShadows className={classes.scrollableSection}>
          <Hidden smUp={true}>
            <Grid item xs={12} sm={4} className={classes.rigidProfilePhotoSection}>
              <ProfilePhotoFormSection
                  classes={classes}
                  currentValues={currentValues}
                  openPhotoEditor={this.openPhotoEditor} />
            </Grid>
          </Hidden>

          <Grid container direction='row' spacing={width === 'xs' ? 0 : 24}>
            <Hidden xsDown={true}>
              <Grid item sm={4}/>
            </Hidden>
          { /* Material-ui is overly specific in its css selectors so this has to go in style */ }
            <Grid item xs={12} sm={8} style={{padding: width === 'xs' ? '0 24px' : '0 36px 0 0'}}>
              <ArtistInfoFormSection
                  classes={classes}
                  currentValues={currentValues}
                  change={change}
                  genresForSelect={genresForSelect} />
            </Grid>
          </Grid>
        </ScrollShadows>

      </form>
    );
  }
}

const mapStateToProps = (state, props) => ({
  genres: state.genres || [],
});

const mapDispatchToProps = {
  getGenres: GenreActions.getGenres,
};

// NB We're not calling `reduxForm` on this component and are calling it on the
// parent instead.
// This is because its submit button is a sibling component, and there isn't a
// way for that submit button and this form's submit functionality to
// communicate without the parent owning the process.
export default compose(
  withStyles(styles),
  withWidth(),
  connect(mapStateToProps, mapDispatchToProps),
  SmallDeviceFullScreenDialog,
)(AristInfoForm);

