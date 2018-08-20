import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
/* eslint-disable */
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';

import configureStore from './store';
import { getDomAttributesAsProps } from './utils/domHelpers';

const store = configureStore(window.initialState || {});

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

const RenderFromDomNode = ({ node, Component, onMount, onUnMount, className }) => {
    const domNode = document.getElementById(node);
    if (!domNode) {
        return;
    }

    if(className) {
        domNode.classList.add(className);
    }

    // Get DOM node attributes to pass into the component as props
    const componentProps = getDomAttributesAsProps(domNode);
    const children = domNode.innerHTML;

    ReactDOM.render(
            <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Provider store={store}>
                            <Component
                                {...componentProps}
                                className={className || ''}
                            >
                                {children}
                            </Component>
                    </Provider>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        , domNode);
}

export default RenderFromDomNode;
