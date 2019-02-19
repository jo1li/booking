import React from 'react';
import { CloudUpload } from '../icons';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    container: {
        border: `solid 1px ${theme.palette.primaryTonal[500]}`,
        outline: 'none',
        borderColor: theme.palette.primaryTonal[500],
        borderRadius: '100%',
        color: theme.palette.primaryTonal[500],
        padding: '8px 9px',
        fontSize: '0.8125rem',
        width: '44px',
        height: '44px',
        outline: 'none',
        minWidth: '44px',
        minHeight: '44px',
        borderColor: theme.palette.primaryTonal[500],
        borderRadius: '100%',
        cursor: 'pointer',
        '&:hover': {
            border: `1px solid ${theme.palette.primaryTonal[500]}`,
            backgroundColor: 'rgba(0, 185, 209, 0.08)',
        }
    }
})

const FakeUploadButton = ({ classes }) =>
    <div className={classes.container}>
         <CloudUpload />
    </div>

export default withStyles(styles)(FakeUploadButton);

/*const FakeUploadButton = () =>
    <div className="MuiButtonBase-root-87 MuiButton-root-375 MuiButton-outlined-383 MuiButton-outlinedSecondary-385 MuiButton-sizeSmall-398 ContainedButtons-button-374 FabButton-button-401 FabButton-button-401 undefined">
         <CloudUpload />
    </div>

export default withStyles(styles)(FakeUploadButton);*/
