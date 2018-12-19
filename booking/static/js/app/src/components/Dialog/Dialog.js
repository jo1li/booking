import React from 'react';
import { compose } from 'redux';
import DialogBase from './DialogBase';
import DialogStateManager from './DialogStateManager';
import withWidth from '@material-ui/core/withWidth';
import { Close } from '../icons';

export const getConfiguredDialog = ({isFullScreen, CloseComponent = Close, reverseColors = false}) => {
    const StatelessDialog = ({ children, width, isOpen, close, ...props }) => {
        // TODO: might want to handle the isFullScreen default better, a function?
        return (
            <DialogBase
                maxWidth={false}
                isOpen={isOpen}
                close={close}
                reverseColors={reverseColors}
                fullScreen={isFullScreen || 'xs' === width}
                CloseComponent={CloseComponent}
                {...props}
            >
                { children }
            </DialogBase>
        )
    }

    return compose(
        DialogStateManager,
        withWidth(),
    )(StatelessDialog);
}

export default getConfiguredDialog({CloseComponent: Close});
