import React from 'react';
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

const RenderFromDomNode = ({ node, Component, onMount, onUnMount }) => {
    const domNode = document.getElementById(node);

    const mappedKeys = _.mapKeys(domNode.attributes, value => value.nodeName)
    const componentProps = _.mapValues(mappedKeys, value => domNode.getAttribute(value.nodeName))

    ReactDOM.render(
            <MuiThemeProvider theme={theme}>
        <Provider store={store}>
                <Component
                    {...componentProps}
                />
        </Provider>
            </MuiThemeProvider>
        , domNode);
}

export default RenderFromDomNode;
