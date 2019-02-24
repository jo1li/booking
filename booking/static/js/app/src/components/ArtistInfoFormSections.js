import React, { Fragment } from 'react';
import { Field } from 'redux-form';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import _ from 'lodash';

import ImageUploadContainer from './form/ImageUploadContainer';
import MultiSelect from './form/MultiSelect';
import SelectState from './form/SelectState';
import TextCount from './form/TextCount';
import TextField from './form/TextField';
import { MAX_BIO_SHORT_INPUT_LENGTH } from '../constants';
import { validateMaxLength } from '../utils/validators';

import IconSpotify from './ArtistCard/IconSpotify';
import IconFacebook from './ArtistCard/IconFacebook';
import IconInstagram from './ArtistCard/IconInstagram';

const GENRES_MAX = 3;

// NB: Don't define this in the prop value; it won't work the way you expect.
const validateTaglineMaxLength = validateMaxLength(MAX_BIO_SHORT_INPUT_LENGTH);

const formatSocialURL = ({ urlBase, fieldName, currentValues, change }) => {
  const url = currentValues[fieldName];
  if(!url) return;
  // Consider the word characters after the last slash to be the username
  const re = /^(?:.*\/)?(\w+)$/;
  const formattedUrl = url.replace(re, (match, username) => {
    return `${urlBase}/${username}`;
  });
  change(fieldName, formattedUrl);
};

const normalizeGenres = (genres) => {
  if (!genres) {
    return genres
  }
  if (Array.isArray(genres)) {
    return genres.slice(0,GENRES_MAX);
  }
};

const FacebookAdornment = (
  <InputAdornment position="start">
    <IconFacebook active/>
  </InputAdornment>
);
const InstagramAdornment = (
  <InputAdornment position="start">
    <IconInstagram active/>
  </InputAdornment>
);
const SpotifyAdornment = (
  <InputAdornment position="start">
    <IconSpotify active/>
  </InputAdornment>
);

export const ProfilePhotoFormSection = (props) => {
  const { classes, currentValues, openPhotoEditor } = props;

  return (
    <FormControl margin="normal" className={classes.uploadArea} fullWidth>
      <Field
        name="image"
        component={ImageUploadContainer}
        label={currentValues.image ? 'Change' : 'Add Photo'}
        type="file"
        currentValues={currentValues}
        handleOnDrop={openPhotoEditor}
      />
    </FormControl>
  );
}

export const ArtistInfoFormSection = (props) => {
  const { classes, currentValues, change, genresForSelect } = props;

  return (
    <Fragment>
      <FormControl margin="normal" fullWidth>
        <TextCount
            inline={true}
            className={classes.textCount}
            maxLength={MAX_BIO_SHORT_INPUT_LENGTH}
            currentLength={_.get(currentValues, 'bio_short', []).length } >
          <Field
            name="bio_short"
            label={'Tagline'}
            multiline={true}
            maxLength={MAX_BIO_SHORT_INPUT_LENGTH}
            component={TextField}
            validate={[validateTaglineMaxLength]}
            placeholder='Tagline'
            errorClassName={classes.error}
            helpText={<Typography variant="caption" className={classes.caption}>Required</Typography>}
            InputLabelProps={{
              classes: {
                root: classes.placeholder,
                shrink: classes.label,
              },
              className: classes.splitLabel,
            }}
            InputProps={{
              classes: {
                root: classes.textInput,
                input: classes.textInput
              }
            }}
            fullWidth
          />
        </TextCount>
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <Field
          name="genres"
          label="Genres"
          isMulti
          component={MultiSelect}
          options={genresForSelect}
          helpText={<Typography variant="caption" className={classes.caption}>Required • Select up to three.</Typography>}
          normalize={normalizeGenres}
          InputLabelProps={{
            classes: { shrink: classes.label },
            shrink: true,
          }}
        >
        </Field>
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <Field
          name="website"
          label='Website'
          placeholder="http://www.example.com"
          component={TextField}
          InputLabelProps={{
            shrink: true,
            classes: { shrink: classes.label },
          }}
          InputProps={{
            classes: {
              input: classes.textInput
            }
          }}
          onBlur={
            (e) => {
              const url = currentValues.website;
              if(!url) return;
              const re = /^(.*:\/\/)?(.*)$/;
              const formattedUrl = url.replace(re, (match, protocolPrefix, rest) => {
                return `${protocolPrefix || 'http://'}${rest}`;
              });
              change('website', formattedUrl);
              e.preventDefault();
            }
          }
        />
      </FormControl>
      <Grid container spacing={16}>
        <Grid item style={{flexGrow: 1}}>
          <FormControl margin="normal" fullWidth>
            <Field
              name="hometown"
              label="City"
              placeholder="City"
              component={TextField}
              InputLabelProps={{
                shrink: true,
                classes: { shrink: classes.label },
              }}
              InputProps={{
                classes: {
                  input: classes.textInput
                }
              }}
            />
          </FormControl>
        </Grid>
        <Grid item className={classes.state}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="state" className={classes.label}>
              <Typography variant="overline">State</Typography>
            </InputLabel>
            <Field
                component={SelectState}
                id="state"
                label="State"
                name="state"
                placeholder="State"
                type="select"
            />
          </FormControl>
        </Grid>
      </Grid>
      <FormControl margin="normal" fullWidth style={{marginTop: 56}}>
        <Field
          name="facebook"
          label="Facebook Link"
          placeholder="https://facebook.com/page"
          component={TextField}
          InputProps = {{
            startAdornment: FacebookAdornment,
            classes: {
              input: classes.textInput
            }
          }}
          InputLabelProps={{
            shrink: true,
            classes: { shrink: classes.label },
          }}
          onBlur={
            (e) => {
              formatSocialURL({
                urlBase: 'https://facebook.com',
                fieldName: 'facebook',
                currentValues,
                change,
              });
              e.preventDefault();
            }
          }
        />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <Field
          name="instagram"
          label="Instagram Link"
          placeholder="https://instagram.com/username"
          component={TextField}
          InputProps = {{
            startAdornment: InstagramAdornment,
            classes: {
              input: classes.textInput
            }
          }}
          InputLabelProps={{
            shrink: true,
            classes: { shrink: classes.label },
          }}
          onBlur={
            (e) => {
              formatSocialURL({
                urlBase: 'https://instagram.com',
                fieldName: 'instagram',
                currentValues,
                change,
              });
              e.preventDefault();
            }
          }
        />
      </FormControl>
      <FormControl margin="normal" fullWidth style={{ marginBottom: 48 }}>
        <Field
          name="spotify"
          label="Spotify Link"
          placeholder="https://open.spotify.com/artist/12345"
          component={TextField}
          InputProps = {{
            startAdornment: SpotifyAdornment,
            classes: {
              input: classes.textInput
            }
          }}
          InputLabelProps={{
            shrink: true,
            classes: { shrink: classes.label },
          }}
          onBlur={
            (e) => {
              formatSocialURL({
                urlBase: 'https://open.spotify.com/artist',
                fieldName: 'spotify',
                currentValues,
                change,
              });
              e.preventDefault();
            }
          }
        />
      </FormControl>
    </Fragment>
  );
}

