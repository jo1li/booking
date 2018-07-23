import React from 'react';
import './index.css';
import VideoCarousel from './components/VideoCarousel';
import UserEditForm from './components/UserEditForm';
import RenderFromDomNode from './renderFromDomNode';

const CONFIGS = window.CONFIGS || {};

RenderFromDomNode({
    Component: UserEditForm,
    node: 'user-edit-form',
})

// TODO: Use `CONFIGS` to set the image base url (in other PR)
RenderFromDomNode({
    Component: VideoCarousel,
    node: 'video-carousel',
    CONFIGS,
})
