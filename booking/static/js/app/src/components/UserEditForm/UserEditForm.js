import React, { Component } from 'react';
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
import { Caption, Display1 } from '../typography';

import InputButtons from './InputButtons';
import {
  DeleteButton,
  AddButton,
} from '../form/FabButton';

import ModalHeader from '../ModalHeader';
import Input from '../form/Input';
import Select from '../form/Select';
import TextArea from '../form/TextArea';
import TextField from '@material-ui/core/TextField';
import SelectState from '../form/SelectState';
import ImageUploadContainer from '../form/ImageUploadContainer';
import TextCount from '../form/TextCount';
import {
  validateURL,
  validateMaxLength,
} from '../../utils/validators';

import { EDIT_BASIC_INFO, MAX_BIO_SHORT_INPUT_LENGTH } from '../../constants'

import {
  updateUserBio,
  getGenres,
} from '../../request/requests';
import styles from './styles';
import UploadButton from './UploadButton';

// NB: Don't define this in the prop value; it won't work the way you expect.
const validateTaglineMaxLength = validateMaxLength(MAX_BIO_SHORT_INPUT_LENGTH);

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
      musicianId,
      updateUserBio,
    } = this.props;

    const data = Object.assign({}, values, {
      genres: values.genres,
      image: _.get(values, 'image.file'),
    });

    return updateUserBio(data, musicianId).then(res => {
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
        classes,
        valid,
    } = this.props;

    const {
      genres
    } = this.state;


    return (
      <div className={`${classes.container} ${classes.withFooter}`}>
        <ModalHeader classes={classes}>Edit Your Info</ModalHeader>
        <div className={classes.scrollableBody}>
          <Grid xs={12} lg={12}>
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
                      <UploadButton />
                    </ImageUploadContainer>
                  </InputButtons>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Caption>TAGLINE</Caption>
                    <TextCount
                      maxLength={MAX_BIO_SHORT_INPUT_LENGTH}
                      currentLength={_.get(currentValues, 'bio_short', []).length }
                    >
                      <Field
                        name="bio_short"
                        label="Tagline"
                        placeholder="Your tagline"
                        multiline={true}
                        maxLength={MAX_BIO_SHORT_INPUT_LENGTH}
                        component={Input}
                        validate={[validateTaglineMaxLength]}
                      />
                    </TextCount>
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
                        label="Website"
                        name="website"
                        placeholder="Website"
                        type="text"
                        validate={[validateURL]}
                      />
                  </Grid>
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
                        placeholder="What is your home town?"
                        type="text"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Field
                        component={SelectState}
                        id="state"
                        label="state"
                        name="state"
                        placeholder="State"
                        type="select"
                    />
                  </Grid>
                  <Grid  item xs={12} sm={12} md={12} lg={12}>
                    <Caption >SOCIAL PROFILES</Caption>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                        component={Input}
                        id="facebook"
                        label="facebook"
                        name="facebook"
                        placeholder="Connect Facebook account"
                        validate={[validateURL]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                        component={Input}
                        id="instagram"
                        label="instagram"
                        name="instagram"
                        placeholder="Connect Instagram account"
                        validate={[validateURL]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                        component={Input}
                        id="spotify"
                        label="spotify"
                        name="spotify"
                        placeholder="Connect Spotify account"
                        validate={[validateURL]}
                    />
                  </Grid>

              </Grid>
            </form>
          </Grid>
        </div>
        <CancelConfirm
            onClickCancel={closeDialog}
            onClickConfirm={handleSubmit(this.submit)}
            isLoading={submitting}
            disabled={!valid}
            success={submitSucceeded}
            className={classes.footer}
        />
      </div>
    );
  }
}

// TODO these can probably be combined
UserEditForm = withStyles(styles)(UserEditForm)

UserEditForm = reduxForm({
  form: EDIT_BASIC_INFO,
})(UserEditForm);

const mapStateToProps = (state, props) => ({
  // TODO add defaults value function
  initialValues: {
    stage_name: props.stage_name,
    image: props.image,
    facebook: props.facebook,
    instagram: props.instagram,
    spotify: props.spotify,
    hometown: props.hometown,
    genres: props.genres.map(g => g.name),
    state: props.state,
    website: props.website,
    bio_short: props.bio_short,
  },
  currentValues: getFormValues(EDIT_BASIC_INFO)(state) || {},

  // TODO this should go into bindActionCreators and be used as an action
  updateUserBio: updateUserBio,
  getGenres: getGenres,
  musicianId: props.id,
})

export default connect(mapStateToProps)(UserEditForm);
