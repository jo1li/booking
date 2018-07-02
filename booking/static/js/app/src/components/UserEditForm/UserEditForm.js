import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
  getFormValues,
} from 'redux-form';
import { required } from 'redux-form-validators';
import autoBind from 'auto-bind';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash'

import CancelConfirm from '../CancelConfirm';
// import BindDomEvent from '../HOComponents/BindDomEvents';
import FullScreenDialog from '../modal/FullScreenDialog';

import { Display1, Caption } from '../typography';

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
import { filterUndefined } from '../../utils/formHelpers';
import TextCount from '../form/TextCount';

import {
  updateUserBio,
  getGenres,
} from '../../request/requests';
import styles from './styles';

// TODO put in constants file
const EDIT_BASIC_INFO = 'EDIT_BASIC_INFO';
const MAX_BIO_INPUT_LENGTH = 300;

class UserEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
    }

    // props.bindDomEvent({
    //     domId: 'open-edit-user-profile',
    //     eventType: 'click',
    //     callback: props.openDialog
    // })

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

    let data = Object.assign({}, values, {
      genres: values.genres,
      image_hero: _.get(values, 'image_hero.file'),
    });

    data = filterUndefined(data);

    return updateUserBio(data, musicianid);
  }

  render() {
    const {
        closeDialog,
        change,
        submitting,
        handleSubmit,
        classes,
        currentValues,
        submitSucceeded,
    } = this.props;

    const {
      genres
    } = this.state;

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <CancelConfirm
            onClickCancel={closeDialog}
            isLoading={submitting}
            success={submitSucceeded}
        >
          <Grid container spacing={24} direction="row">
            <Grid className={classes.captionTop} item xs={12} sm={12} md={12} lg={12}>
              <Display1>Edit Basic Info</Display1>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Caption >PICTURE AVATAR</Caption>
            </Grid>
             <InputButtons
                component={Input}
                id="image_hero"
                label="image_hero"
                name="image_hero.name"
                placeholder="Your Avatar"
                type="text"
              >
                <ImageUploadContainer
                  onUpload={values => change('image_hero', values)}
                >
                  <UploadButton/>
                </ImageUploadContainer>
              </InputButtons>

              <Grid className={classes.caption} item xs={12} sm={12} md={12} lg={12}>
                <Caption >SOCIAL PROFILES</Caption>
              </Grid>
             <InputButtons
                component={Input}
                id="facebook"
                label="facebook"
                name="facebook"
                placeholder="Connect Facebook account"
                type="text"
                validate={[required()]}
              >
                <AddButton/>
                <DeleteButton
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
                validate={[required()]}
              >
                <AddButton/>
                <DeleteButton
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
                validate={[required()]}
              >
                <AddButton/>
                <DeleteButton
                  disabled={!currentValues.spotify}
                  onClick={() => change('spotify', '')}
                />
              </InputButtons>
            <Grid className={classes.caption}  item xs={12} sm={8} md={8} lg={8}>
              <Caption >HOME TOWN</Caption>
            </Grid>
             <Grid className={classes.caption} item xs={12} sm={4} md={4} lg={4}>
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
                  validate={[required()]}
              />
            </Grid>
            <Grid className={classes.caption} item xs={12} sm={12} md={12} lg={12}>
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
              <Grid className={classes.caption} item xs={12} sm={12} md={12} lg={12}>
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
                  validate={[required()]}
                />
            </Grid>
              <Grid className={classes.caption} item xs={12} sm={12} md={12} lg={12}>
                <Caption>SUMMARY</Caption>
                <TextCount
                  maxLength={MAX_BIO_INPUT_LENGTH}
                  currentLength={currentValues.bio.length}
                >
                  <Field
                    component={TextArea}
                    id="bio"
                    label="bio"
                    name="bio"
                    placeholder="bio"
                    type="textarea"
                    onChange={changeObj => {

                      // TODO move this out of the onChange function
                      // prevent input form going beyond MAX_BIO_INPUT_LENGTH in characters
                      if (changeObj.target.value.length > MAX_BIO_INPUT_LENGTH) {
                        change('bio', changeObj.target.value.subString(0, MAX_BIO_INPUT_LENGTH))
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
        </CancelConfirm>
      </form>
    );
  }
}

// TODO these can probably be combined
UserEditForm = withStyles(styles)(UserEditForm)

UserEditForm = compose(
    // BindDomEvent,
    FullScreenDialog,
)(UserEditForm);

UserEditForm = reduxForm({
  form: EDIT_BASIC_INFO,
})(UserEditForm);

const mapStateToProps = (state, props) => ({

  // TODO add defaults value function
  initialValues: {
    stage_name: props.stage_name,
    image_hero: props.avatar,
    facebook: props.facebook,
    instagram: props.instagram,
    spotify: props.spotify,
    hometown: props.hometown,
    genres: props.genres.split(', ') || [],
    state: props.state,
    website: props.website,
    bio: props.bio,
  },
  currentValues: getFormValues(EDIT_BASIC_INFO)(state),

  // TODO this should go into bindActionCreators and be used as an action
  updateUserBio: updateUserBio,
  getGenres: getGenres,
  musicianId: props.musicianId,
})

export default connect(mapStateToProps)(UserEditForm);