import React from 'react';
import { compose } from 'redux';
import DialogBase from './DialogBase';
import Dialog from './Dialog';
import withWidth from '@material-ui/core/withWidth';
import includes from 'lodash/includes';

const FullScreenDialog = ({ children, width, open, close }) => {
        return (
            <DialogBase
                maxWidth={false}
                isOpen={open}
                close={close}
                fullScreen={includes(['xs', 'sm'], width)}
            >
                { children }
            </DialogBase>
        )
    }

export default compose(

    // Add state management
    Dialog,
    withWidth(),
)(FullScreenDialog)

