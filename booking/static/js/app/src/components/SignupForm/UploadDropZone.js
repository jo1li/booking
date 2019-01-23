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

const EmptyImagePreview = ({classes}) => (
  <div className={classNames(classes.imagePreview, classes.emptyImagePreview)}>
    <Camera size={22} />
  </div>
)

const ImagePreview = ({ image, classes }) => {
  if(!image) {
    return <EmptyImagePreview classes={classes} />;
  }

  return <img src={image.preview} alt={image.name} className={classes.imagePreview} />;
};

const DropZoneField = ({
  handleOnDrop,
  input,
  image,
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
              <ImagePreview image={image} classes={classes} />
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
