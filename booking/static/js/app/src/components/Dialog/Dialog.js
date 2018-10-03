import React, { Component, Fragment } from 'react';
import autoBind from 'react-autobind';
import Empty from '../Empty';

/**
 * The DialogStateManager component takes a Dialog component,
 * then a wrapped component. The wrapped component will be passed
 * openDialog and closeDialog functions
 *
 * @param {ReactElement} Dialog - a Dialog component
 * @param {ReactElement} WrappedComponent - component that will use openDialog to launch the Dialog component
 *
 * @return {ReactElement}
 */
const DialogStateManager = Dialog => WrappedComponent => {
    class DialogWrapper extends Component {
        static initialState = {
            isOpen: false,
            content: <Empty />
        }

        constructor(props) {
            super(props);

            this.state = DialogWrapper.initialState;

            autoBind(this);
        }

        openDialog(content) {
            this.setState({
                isOpen: true,
                content,
            })
        }

        closeDialog() {
            this.setState(DialogWrapper.initialState);
        }

        render() {
            return (
                <Fragment>
                    <WrappedComponent {...this.props}
                        openDialog={this.openDialog}
                        closeDialog={this.closeDialog}
                    />
                    <Dialog
                        open={this.state.isOpen}
                        close={this.closeDialog}
                    >
                        { this.state.content }
                    </Dialog>
                </Fragment>
            )
        }
    }

    return DialogWrapper;
}

export default DialogStateManager;
