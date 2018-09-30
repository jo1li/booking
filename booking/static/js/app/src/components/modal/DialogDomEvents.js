import React, { Component } from 'react';
import { compose } from 'redux';
import autoBind from 'react-autobind';
import BindDomEvent from '../HOComponents/BindDomEvents';
import FullScreenDialog from '../modal/FullScreenDialog';
import Empty from '../Empty';

/**
 * Renders an empty container that can launch a modal with selected component
 *
 * @param {String} eventType - event such as 'click', 'hover' etc..
 * @param {Object} options
 * @param {String} options.triggerSelector - DOM node to bound event to
 * @param {ReactElement} options.DialogContent - React element to render as the Dialog content
 *
 * @return {ReactElement}
 */
export const OpenDialogEvent = eventType => ({
    triggerSelector,
    DialogContent,
    DialogComponent = FullScreenDialog,
}) => {
    class Container extends Component {
        constructor() {
            super();

            autoBind(this);
        }

        componentWillMount() {
            this.props.bindDomEvent({
                domId: triggerSelector,
                eventType,
                callback: () => {
                    this.props.openDialog(
                        <DialogContent { ...this.props } />
                    )
                }
            })
        }

        render() {
            return <Empty />
        }
    }

    return compose(
        DialogComponent,
        BindDomEvent,
    )(Container)
}

/**
 * openDialogEvent with click event
 */
export const ClickToOpenDialog = OpenDialogEvent('click');
