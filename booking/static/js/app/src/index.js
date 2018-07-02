import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import VideoCarousel from './components/VideoCarousel';
import UserEditForm from './components/UserEditForm';
import RenderFromDomNode from './renderFromDomNode';

RenderFromDomNode({
    Component: UserEditForm,
    node: 'user-edit-form',
})

RenderFromDomNode({
    Component: VideoCarousel,
    node: 'video-carousel',
})
