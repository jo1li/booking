import React from 'react';
import { compose } from 'redux';
import DialogBase from './DialogBase';
import Dialog from './Dialog';
import withWidth from '@material-ui/core/withWidth';
import includes from 'lodash/includes';

const FullScreenDialog = ({ children, width, isOpen, close, ...props }) => {
        return (
            <DialogBase
                maxWidth={false}
                isOpen={isOpen}
                close={close}
                fullScreen={'xs' === width}
                {...props}
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

