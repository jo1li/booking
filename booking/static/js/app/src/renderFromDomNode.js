import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import configureStore from './store';

const store = configureStore();

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#7f9ca8",
            main: "#526e79",
            dark: "#27434d",
            contrastText: "#fff",
        },
        secondary: {
            light: "#53ecfd",
            main: "#00b9d1",
            dark: "#0089a0",
            contrastText: "#fff",
        }
    }
});

// class DomLifeCycleEvents extends Component {
//     constructor () {
//         super();
//         this.state = {}
//     }
//     componentWillMount() {
//         this.props.onMount && this.props.onMount(newState => this.setState(newState), this.state);
//     }

//     componentWillUnmount() {
//         this.props.onUnMount && this.props.onUnMount(this.state);
//     }

//     render() {
//         const {
//             componentProps,
//             Component
//         } = this.props;
//         return <Component {...componentProps} {...this.state}/>
//     }
// }

const RenderFromDomNode = ({ node, Component, onMount, onUnMount }) => {
    const domNode = document.getElementById(node);

    const mappedKeys = _.mapKeys(domNode.attributes, value => value.nodeName)
    const componentProps = _.mapValues(mappedKeys, value => domNode.getAttribute(value.nodeName))

    ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <Component
                    {...componentProps}
                />
            </MuiThemeProvider>
        </Provider>
        , domNode);
}

export default RenderFromDomNode;