import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
  getFormValues,
} from 'redux-form';
import autoBind from 'react-autobind';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash'

import CancelConfirm from '../CancelConfirm';
import FullScreenDialog from '../modal/FullScreenDialog';
import { Caption, Display1 } from '../typography';

import InputButtons from './InputButtons';
import {
  UploadButton,
  DeleteButton,
  AddButton,
} from '../form/FabButton';

import Input from '../form/Input';
import Select from '../form/Select';
import TextArea from '../form/TextArea';
import SelectState from '../form/SelectState';
import ImageUploadContainer from '../form/ImageUploadContainer';
import TextCount from '../form/TextCount';

import {
  updateUserBio,
  getGenres,
} from '../../request/requests';
import styles from './styles';

// TODO put in constants file
const EDIT_BASIC_INFO = 'EDIT_BASIC_INFO';
const MAX_BIO_SHORT_INPUT_LENGTH = 300;

class UserEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
    }

    autoBind(this);
  }

  componentWillMount() {

    // TODO MOVE THIS! this is not the correct way to get data
    this.props.getGenres().then(res => {
      this.setState({
        genres: res.data.results.map(result => result.name)
      })
    })
  }

  submit(values) {
    const {
      musicianid,
      updateUserBio,
    } = this.props;

    const data = Object.assign({}, values, {
      genres: values.genres,
      image: _.get(values, 'image.file'),
    });

    return updateUserBio(data, musicianid).then(res => {
      // TODO: Prob a better to check for this
      if(res.status === 200) {
        // TODO: Don't *actually* refresh the page, but update with submitted values
        //    temporary stopgap to allow team members to test w/ out
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      }

    })
    .catch(errors => {
      console.log('errors', errors);
      // throw new SubmissionError({
      //   image: errors.image.join(', ')
      // })
    });
  }

  render() {
    const {
        closeDialog,
        change,
        submitting,
        handleSubmit,
        currentValues,
        submitSucceeded,
        classes
    } = this.props;

    const {
      genres
    } = this.state;

    return (
      <div className={classes.container}>
        <Grid container spacing={24}>
          <Grid item className={classes.captionTop} xs={12} sm={12} md={12} lg={12}>
            <Display1 className={classes.caption} >Edit Basic Info</Display1>
          </Grid>
          <Grid item xs={12} lg={12}>
            <form onSubmit={handleSubmit(this.submit)}>
              <Grid container spacing={24} direction="row">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Caption >PICTURE AVATAR</Caption>
                </Grid>
                 <InputButtons
                    component={Input}
                    id="image"
                    label="image"
                    name="image.name"
                    placeholder="Your Avatar"
                    type="text"
                  >
                    <ImageUploadContainer
                      onUpload={values => change('image', values)}
                    >
                      <UploadButton/>
                    </ImageUploadContainer>
                  </InputButtons>

                  <Grid  item xs={12} sm={12} md={12} lg={12}>
                    <Caption >SOCIAL PROFILES</Caption>
                  </Grid>
                 <InputButtons
                    component={Input}
                    id="facebook"
                    label="facebook"
                    name="facebook"
                    placeholder="Connect Facebook account"
                    type="text"
                  >
                    <AddButton mobileText="CONNECT"/>
                    <DeleteButton
                      mobileText="DISCONNECT"
                      disabled={!currentValues.facebook}
                      onClick={() => change('facebook', '')}
                    />
                 </InputButtons>
                 <InputButtons
                    component={Input}
                    id="instagram"
                    label="instagram"
                    name="instagram"
                    placeholder="Connect Instagram account"
                    type="text"
                  >
                    <AddButton mobileText="CONNECT"/>
                    <DeleteButton
                      mobileText="DISCONNECT"
                      disabled={!currentValues.instagram}
                      onClick={() => change('instagram', '')}
                    />
                 </InputButtons>
                 <InputButtons
                    component={Input}
                    id="spotify"
                    label="spotify"
                    name="spotify"
                    placeholder="Connect Spotify account"
                  >
                    <AddButton mobileText="CONNECT"/>
                    <DeleteButton
                      mobileText="DISCONNECT"
                      disabled={!currentValues.spotify}
                      onClick={() => change('spotify', '')}
                    />
                  </InputButtons>
                <Grid item xs={12} sm={8} md={8} lg={8}>
                  <Caption >HOME TOWN</Caption>
                </Grid>
                 <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Caption >STATE</Caption>
                </Grid>
                <Grid item xs={12} sm={8} md={8} lg={8}>
                  <Field
                      component={Input}
                      id="hometown"
                      label="hometown"
                      name="hometown"
                      placeholder="What is your home town"
                      type="text"
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Field
                      component={SelectState}
                      id="state"
                      label="state"
                      name="state"
                      placeholder="state"
                      type="select"
                  />
                </Grid>
                <Grid  item xs={12} sm={12} md={12} lg={12}>
                  <Caption >GENRE</Caption>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Field
                      component={Select}
                      id="genre"
                      label="genre"
                      name="genres.0"
                      placeholder="Select a genre"
                      items={genres}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Field
                      component={Select}
                      id="genre"
                      label="genre"
                      name="genres.1"
                      placeholder="Select a genre"
                      items={genres}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Field
                      component={Select}
                      id="genre"
                      label="genre"
                      name="genres.2"
                      placeholder="Select a genre"
                      items={genres}
                    />
                  </Grid>
                  <Grid  item xs={12} sm={12} md={12} lg={12}>
                    <Caption >WEBSITE</Caption>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                      component={Input}
                      id="website"
                      label="website"
                      name="website"
                      placeholder="website"
                      type="text"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Caption>SUMMARY</Caption>
                  <TextCount
                    maxLength={MAX_BIO_SHORT_INPUT_LENGTH}
                    currentLength={currentValues.bio_short.length}
                  >
                    <Field
                      component={TextArea}
                      id="bio_short"
                      label="bio_short"
                      name="bio_short"
                      placeholder="Your bio"
                      type="textarea"
                      onChange={changeObj => {

                        // TODO move this out of the onChange function
                        // prevent input form going beyond MAX_BIO_SHORT_INPUT_LENGTH in characters
                        if (changeObj.target.value.length > MAX_BIO_SHORT_INPUT_LENGTH) {
                          change('bio_short', changeObj.target.value.subString(0, MAX_BIO_SHORT_INPUT_LENGTH))
                        }

                          return changeObj
                        }
                      }
                      multiline
                      fullWidth
                    />
                  </TextCount>
                </Grid>
              </Grid>
              <CancelConfirm
                  onClickCancel={closeDialog}
                  onClickConfirm={handleSubmit(this.submit)}
                  isLoading={submitting}
                  success={submitSucceeded}
              />
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// TODO these can probably be combined
UserEditForm = withStyles(styles)(UserEditForm)

UserEditForm = compose(
    FullScreenDialog,
)(UserEditForm);

UserEditForm = reduxForm({
  form: EDIT_BASIC_INFO,
})(UserEditForm);

const mapStateToProps = (state, props) => ({

  // TODO add defaults value function
  initialValues: {
    stage_name: props.stage_name,
    image: props.avatar,
    facebook: props.facebook,
    instagram: props.instagram,
    spotify: props.spotify,
    hometown: props.hometown,
    genres: props.genres.split(', ') || [],
    state: props.state,
    website: props.website,
    bio_short: props.bio_short,
  },
  currentValues: getFormValues(EDIT_BASIC_INFO)(state),

  // TODO this should go into bindActionCreators and be used as an action
  updateUserBio: updateUserBio,
  getGenres: getGenres,
  musicianId: props.musicianId,
})

export default connect(mapStateToProps)(UserEditForm);
