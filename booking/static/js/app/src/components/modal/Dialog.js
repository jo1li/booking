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
        constructor(props) {
            super(props);

            this.state = {
                isOpen: false,
                Content: Empty
            }

            autoBind(this);
        }

        openDialog(Content) {
            this.setState({
                isOpen: true,
                Content,
            })
        }

        closeDialog() {
            this.setState({
                isOpen: false,
                Content: Empty,
            })
        }

        render() {
            const Content = this.state.Content;
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
                        { Content }
                    </Dialog>
                </Fragment>
            )
        }
    }

    return DialogWrapper;
}


export default DialogStateManager;
