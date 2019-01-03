import map from "lodash/map";
import React, { Fragment } from "react";
import DropZone from "react-dropzone";
import { UploadCloud } from "react-feather";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { geGetImageFiletPreview } from '../../utils/formHelpers';
import { MAX_CANVAS_IMAGE_WIDTH } from '../../constants/imageConstants';
import { orientImage } from '../../helpers/imageHelpers';


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
  meta: { error, touched }
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
      }, { maxWidth: MAX_CANVAS_IMAGE_WIDTH })}
    >
        <Fragment>
          <Grid container style={{ flexGrow: 1 }}>
            <Grid item>
              {imagefile && imagefile.length > 0 ? (
                <ul>
                  {renderImagePreview(imagefile)}
                </ul>
              ) : (
                <div style={{
                  margin: '4px',
                  textAlign: 'center',
                  width: 100,
                  height: 50,
                  borderRadius: 2,
                  backgroundColor: '#fff',
                  MozBoxShadow:    'inset 0 0 0 1px rgba(0,0,0,0.15)',
                  WebkitBoxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)',
                  BoxShadow:       'inset 0 0 0 1px rgba(0,0,0,0.15)',
                }}>
                  <UploadCloud style={{ height: 50 }}/>
                </div>
              )}
            </Grid>
            <Grid item>
              <Typography color="inherit" variant="body2" style={{ marginTop: '4px', lineHeight: '50px', paddingLeft: '8px' }}>Profile photo</Typography>
            </Grid>
          </Grid>
        </Fragment>
    </DropZone>
    {touched && error && <div>{error}</div>}
  </Fragment>
);

export default DropZoneField;
