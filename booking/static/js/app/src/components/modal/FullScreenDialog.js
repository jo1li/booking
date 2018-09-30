import React from 'react';
import { compose } from 'redux';
import DialogBase from './DialogBase';
import Dialog from './Dialog';
import withWidth from '@material-ui/core/withWidth';
import includes from 'lodash/includes';
import DialogRoot from './DialogRoot';
import Empty from '../Empty';

const FullScreenDialog = ({ children, width, open, close }) => {
        return (
            <DialogRoot
                maxWidth={false}
                open={open}
                close={close}
                fullScreen={includes(['xs', 'sm'], width)}
            >
                { children || (<Empty />) }
            </DialogRoot>
        )
    }

export default compose(
    Dialog,
    withWidth(),
)(FullScreenDialog)

