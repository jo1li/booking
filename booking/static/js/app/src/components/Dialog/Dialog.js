import React from 'react';
import { compose } from 'redux';
import DialogBase from './DialogBase';
import DialogStateManager from './DialogStateManager';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import BasicCloseButton from '../BasicCloseButton';
import { isTablet } from 'react-device-detect';
import {
    defaultColorSchemeStyles,
    reverseColorSchemeStyles,
} from './styles';

export const getConfiguredDialog = ({isFullScreen, CloseComponent = BasicCloseButton, reverseColors = false}) => {
    const StatelessDialog = ({ children, width, isOpen, close, classes, paperProps, ...props }) => {
        // TODO: might want to handle the isFullScreen default better, a function?
        return (
            <DialogBase
                maxWidth={false}
                isOpen={isOpen}
                close={close}
                fullScreen={isFullScreen || 'xs' === width}
                CloseComponent={CloseComponent}
                classes={classes}
                paperProps={paperProps}
                {...props}
            >
                { children }
            </DialogBase>
        )
    }

    const styles = reverseColors ? reverseColorSchemeStyles : defaultColorSchemeStyles;
    return compose(
        DialogStateManager,
        withStyles(styles),
        withWidth(),
    )(StatelessDialog);
}

export const TabletFullScreenDialog = getConfiguredDialog({isFullScreen: isTablet});
export default getConfiguredDialog({CloseComponent: BasicCloseButton});
