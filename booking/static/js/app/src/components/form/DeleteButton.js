import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import CloudUpload from '@material-ui/icons/CloudUpload';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    height: '44px',
    minHeight: '44px',
    width: '44px',
    minWidth: '44px',
  },
});

const UploadButton = (props) => {
    const {
        classes
    } = props;

    return (
        <Button
            outlined
            variant="fab"
            size="small"
            {...props}
            className={`${classes.button} ${props.className}`}
        >
            <CloudUpload />
        </Button>
    )
}

export default withStyles(styles)(UploadButton);