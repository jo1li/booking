import React, { Component } from 'react';
import { compose } from 'recompose'
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

import Dialog from '../Dialog/Dialog';
import ProfilePhotoEditorForm from '../ProfilePhotoEditorForm';
import { UserInfoFormSection, ProfilePhotoFormSection } from './formSections';

import { selectImageFile, selectImagePreview } from '../../selectors/onboardingSelectors';


import {
  updateUserBio,
  getGenres,
} from '../../request/requests';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: theme.spacing.unit * 5,
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  genreLabel: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.54)',
    paddingBottom: theme.spacing.unit/2,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  state: {
    minWidth: 110,
    width: 'auto',
    maxWidth: '100%',
  },
  city: {
    maxWidth: '100%',
  },
  splitLabel: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  textCount: {
    ...theme.palette.overline,
    color: theme.palette.grey[600],
  },
  uploadArea: {
    width: '100%',
    borderRadius: 3,
    color: theme.palette.primary.main,
    cursor: 'pointer',
    display: 'inline-block',
    overflow: 'hidden',
    '& ul li': {
      margin: 0,
      padding: `${theme.spacing.unit/2}px`,
      listStyleType: 'none',
      lineHeight: '0px',
    },
    '& ul': {
      margin: 0,
      padding: 0,
    },
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    ...theme.typography.button,
    color: 'white',
    marginTop: theme.spacing.unit * 3,
    marginLeft: 0,
    marginRight: 0,
    // TODO: Should not have to overwrite radius in RaisedButton
    borderRadius: 2,
  },
  textInput: {
    ...theme.typography.body1,
    opacity: 1,
    '&::placeholder': {
      opacity: 1,
      color: theme.palette.grey[500],
    },
  },
  placeholder: {
    ...theme.typography.body1,
    color: theme.palette.grey[500],
  },
  label: {
    ...theme.typography.overline,
    transform: 'none', // Overwrite material-ui shrinking behavior
    color: theme.palette.grey[800],
  },
  error: {
    ...theme.typography.caption,
    color: 'red',
  },
  scrollMeMore: {
    maxHeight: '100%', // for some reason doesn't work with just height
    overflowY: 'scroll',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 3 / 2, // To eat the negative margin in the grids
    }
  }
});

// Not currently requiring avatar in onboarding.
// const imageIsRequired = value =>  {
//   isEmpty(value) ? <Typography color="error">Please choose a profile photo.</Typography> : undefined;
// }

class OnboardingForm extends Component {
  constructor() {
    super();

    autoBind(this);
  }

  state = {
    genres: [],
    distanceFromTop: 0,
    // Just any number large enough to ensure the bototm shadow shows on load
    // Banking on this modal being tall enough to have scrolling
    distanceFromBottom: 100,
  }

  componentWillMount() {
    this.props.getGenres().then(res => {
      this.setState({
        genres: res.data.results.map(result => result.name),
        // TODO: handle container too tall vs not too tall
      })
    })
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
        onClickConfirm={file => {
          change('image', file.preview);
          change('imageFile', file);
        }} />
    )
  }

  // TODO: move this into an HOC
  toggleScrollShadows(event) {
    if(!this.refs.scrollableContainerWithShadows) {
      return;
    }

    this.setState({
      distanceFromTop: this.refs.scrollableContainerWithShadows.scrollTop,
      distanceFromBottom: this.refs.scrollableContainerWithShadows.scrollHeight - (this.refs.scrollableContainerWithShadows.scrollTop + this.refs.scrollableContainerWithShadows.offsetHeight),
    });

  }

  render() {
    const { classes, currentValues, change, width } = this.props;

    // Not currently requiring image.
    // TODO: remember this is important in onboarding form
    // const requiredEmpty = _.isEmpty(currentValues.genres) || !currentValues.bio_short ? true : false;
    const genresForSelect = this.state.genres.map(g => ({
      value: g,
      label: g
    }));

    return (
      <form className={classes.form} style={{overflow: 'hidden', display: 'flex', position: 'relative', flexGrow: 1, marginTop: 0}}>
      { width !== 'xs' ?
        <Grid container direction='column' spacing={24} style={{position: 'absolute', left: 12, top: 0}}>
          <Grid item xs={12} sm={4}>
            <ProfilePhotoFormSection classes={classes} currentValues={currentValues} openPhotoEditor={this.openPhotoEditor} />
          </Grid>
        </Grid> :
        null
      }

        <div className={classes.scrollMeMore} ref='scrollableContainerWithShadows' onScroll={this.toggleScrollShadows}>
          <div style={{zIndex: 100, position: 'absolute', backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.08))', top: Math.min(this.state.distanceFromTop - 10, 0), left: 0, right: 0, height: '10px'}} />

          { width === 'xs' ?
              <Grid item xs={12} sm={4} style={{ marginTop: 16 }}>
                <ProfilePhotoFormSection classes={classes} currentValues={currentValues} openPhotoEditor={this.openPhotoEditor} />
              </Grid> :
            null
          }

          <Grid container direction='row' spacing={width === 'xs' ? 0 : 24}>
            <Grid item xs={0} sm={4}/>
            <Grid item xs={12} sm={8} style={{padding: width === 'xs' ? '0 24px' : '16px 36px 0 0'}}>
              <UserInfoFormSection classes={classes} currentValues={currentValues} change={change} genresForSelect={genresForSelect}/>
            </Grid>
          </Grid>
          <div style={{zIndex: 100, position: 'absolute', backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.08))', bottom: Math.min(this.state.distanceFromBottom - 10, 0), left: 0, right: 0, height: '10px'}} />
        </div>

      </form>
    );
  }
}

const mapStateToProps = (state, props) => ({
  initialValues: { hometown: "New York", state: "NY" },
  // currentValues: getFormValues(EDIT_BASIC_INFO)(state) || {},

  // TODO this should go into bindActionCreators and be used as an action
  updateUserBio: updateUserBio,
  getGenres: getGenres,
  musicianId: props.musicianId,
  imageFile: selectImageFile(state),
  imagePreview: selectImagePreview(state),
})

// Pulling this out of compose helps initialValues behave correctly.
//  https://stackoverflow.com/a/47475674/103315
// OnboardingForm = reduxForm({
//   form: ARTIST_ONBOARDING,
// })(OnboardingForm)

export default compose(
  withStyles(styles),
  withWidth(),
  connect(mapStateToProps),
  Dialog,
)(OnboardingForm);

