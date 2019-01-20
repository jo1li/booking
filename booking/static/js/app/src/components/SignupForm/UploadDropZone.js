import map from "lodash/map";
import React, { Fragment } from "react";
import DropZone from "react-dropzone";
import { Camera } from '../icons';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { geGetImageFiletPreview } from '../../utils/formHelpers';
import { orientImage } from '../../helpers/imageHelpers';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  photoPlaceholder: {
    margin: '4px',
    textAlign: 'center',
    width: 125,
    height: 80,
    borderRadius: 2,
    backgroundColor: theme.palette.primaryTonal[50],
    MozBoxShadow:    'inset 0 0 0 1px rgba(0,0,0,0.15)',
    WebkitBoxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)',
    BoxShadow:       'inset 0 0 0 1px rgba(0,0,0,0.15)',
  },
  centeredIcon: {
    height: '100%',
  },
  caption: {
    marginTop: theme.spacing.unit * 0.5,
    lineHeight: '21px',
    fontWeight: 500,
  },
});

const renderImagePreview = imagefile => (
  map(imagefile, ({ name, preview }) => [
    <li key="imgpreview" style={{ display: 'inline-block' }}>
      <img src={preview} alt={name} />
    </li>
  ])
);

const DropZoneField = ({
  handleOnDrop,
  input,
  imagefile,
  label,
  meta: { error, touched },
  classes,
}) => (
  <Fragment>
    <DropZone
      accept="image/jpeg, image/png"
      className="upload-container"
      onDrop={file => orientImage(file[0], base64Image => {
        handleOnDrop({
          ...file,
          preview: base64Image
        })
      })}
    >
        <Fragment>
          <Grid container style={{ flexGrow: 1 }} direction='column' alignItems='center'>
            <Grid item>
              {imagefile && imagefile.length > 0 ? (
                <ul>
                  {renderImagePreview(imagefile)}
                </ul>
              ) : (
                <div className={classes.photoPlaceholder}>
                  <Camera className={classes.centeredIcon}/>
                </div>
              )}
            </Grid>
            <Grid item>
              <Typography color="inherit" variant="body2" className={classes.caption}>
                {label}
              </Typography>
            </Grid>
          </Grid>
        </Fragment>
    </DropZone>
    {touched && error && <div>{error}</div>}
  </Fragment>
);

export default withStyles(styles)(DropZoneField);
