import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserEditForm from './components/UserEditForm';
import RenderFromDomNode from './renderFromDomNode';
import registerServiceWorker from './registerServiceWorker';


RenderFromDomNode({
    Component: UserEditForm,
    node: 'user-edit-form',
})
// registerServiceWorker();

