import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import configureStore from './store';
import loadInitialState from './loadInitialState';
import loadShims from './loadShims';

loadShims();
const initialState = loadInitialState();
const store = configureStore(initialState);

const RenderFromDomNode = ({ node, Component, onMount, onUnMount, className, ...props }) => {
    const domNode = document.getElementById(node);
    if (!domNode) {
        return;
    }

    if(className) {
        domNode.classList.add(className);
    }

    const mappedKeys = _.mapKeys(domNode.attributes, value => value.nodeName)
    const componentProps = _.mapValues(mappedKeys, value => domNode.getAttribute(value.nodeName))

    ReactDOM.render(
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                        <Component
                            domNode={domNode}
                            {...componentProps}
                            {...props}
                            className={className || ''}
                        />
                </Provider>
            </MuiThemeProvider>
        , domNode);
}

export default RenderFromDomNode;
