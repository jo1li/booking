import React from 'react';
import DialogBase from './DialogBase';
import withWidth from '@material-ui/core/withWidth';
import includes from 'lodash/includes';

let FullScreenDialog = ({ children, onMount, width }) => {
        return (
            <DialogBase
                onMount={onMount}
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
        onMount={props.onMount}
    >
        <WrappedComponent {...props}/>
    </FullScreenDialog>

export default FullScreenDialogContainer;
