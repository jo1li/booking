import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserEditForm from './components/UserEditForm';
import RenderFromDomNode from './renderFromDomNode';

RenderFromDomNode({
    Component: UserEditForm,
    node: 'user-edit-form',
})
