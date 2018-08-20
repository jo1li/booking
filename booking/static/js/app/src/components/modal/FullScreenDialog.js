import React from 'react';
import DialogBase from './DialogBase';
import withWidth from '@material-ui/core/withWidth';
import includes from 'lodash/includes';

let FullScreenDialog = ({ children, onDialogMount, width }) => {
        return (
            <DialogBase
                onDialogMount={onDialogMount}
                maxWidth={false}
                fullScreen={includes(['xs', 'sm'], width)}
            >
                { children }
            </DialogBase>
        )
    }

FullScreenDialog = withWidth()(FullScreenDialog);

const FullScreenDialogContainer = WrappedComponent => props =>
    <FullScreenDialog
        onDialogMount={props.onDialogMount}
    >
        <WrappedComponent {...props}/>
    </FullScreenDialog>

export default FullScreenDialogContainer;
