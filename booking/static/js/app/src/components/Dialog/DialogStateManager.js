import React, { Component, Fragment } from 'react';
import autoBind from 'react-autobind';
import Mousetrap from 'mousetrap';
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
            content: []
        }

        constructor(props) {
            super(props);
            this.state = DialogWrapper.initialState;

            autoBind(this);
        }

        openDialog(content) {
            this.setState({
                isOpen: true,
                content: [ content, ...this.state.content],
            })
            Mousetrap.bind('escape', this.closeDialog);
        }

        closeDialog() {
            const content = this.state.content.slice(1)
            if (!content.length) {
                this.setState(DialogWrapper.initialState);
            }

            this.setState({ content });
            Mousetrap.unbind('escape');
        }

        closeAllDialogs() {
            this.setState(DialogWrapper.initialState);
            Mousetrap.unbind('escape');
        }

        getContent() {
            const { content } = this.state
            if (!content.length) {
                return <Empty />
            }

            // NB: Some dialogs also open up dialogs that layer on top of
            // themselves; don't pass props to `content` with the same name
            // as props passed to `WrappedComponent` or they will be overwritten
            // when a component is both content and a wrapped dialog trigger.
            return React.cloneElement(content[0], {
                closeDialog: this.closeDialog,
                closeAllDialogs: this.closeAllDialogs
            })
        }

        render() {
            const content = this.getContent();
            return (
                <Fragment>
                    <WrappedComponent {...this.props}
                        openDialog={this.openDialog}
                    />
                    <Dialog
                        isOpen={this.state.isOpen}
                        close={this.closeDialog}
                        paperProps={this.props.paperProps}
                    >
                        { content }
                    </Dialog>
                </Fragment>
            )
        }
    }

    return DialogWrapper;
}

export default DialogStateManager;
