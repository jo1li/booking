import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import BindDomEvent from '../HOComponents/BindDomEvents';
import { Dialog } from '../Dialog';
import Empty from '../Empty';

/**
 * Renders an empty container that can launch a modal with selected component
 *
 * @param {String} eventType - event such as 'click', 'hover' etc..
 * @param {Object} options
 * @param {String} options.triggerSelector - DOM node to bound event to
 * @param {ReactElement} options.DialogContent - React element to render as the Dialog content
 * @param {ReactElement} options.DialogComponent - Optional Dialog component
 *
 * @return {ReactElement}
 */
export const OpenDialogEvent = eventType => ({
    triggerSelector,
    DialogContent,
    DialogComponent = Dialog,
    getIsDisabled,
    paperProps,
}) => {
    class Container extends Component {
        constructor() {
            super();

            autoBind(this);
        }

        componentWillMount() {
            this.props.bindDomEvent({
                domSelector: triggerSelector,
                eventType,
                callback: this.eventCallback,
            });
        }

        eventCallback() {
            if(this.props.isDisabled) return;
            this.props.openDialog(
                <DialogContent { ...this.props } />
            );
        }

        render() {
            return <Empty />
        }
    }

    const mapStateToProps = (state, props) => ({
      isDisabled: getIsDisabled ? getIsDisabled(state) : false,
    });

    return compose(
        DialogComponent,
        BindDomEvent,
        connect(mapStateToProps),
    )(Container);
};


/**
 * openDialogEvent with click event
 */
export const ClickToOpenDialog = OpenDialogEvent('click');
