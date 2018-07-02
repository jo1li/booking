import React from 'react';
import './index.css';
import VideoCarousel from './components/VideoCarousel';
import UserEditForm from './components/UserEditForm';
import RenderFromDomNode from './renderFromDomNode';
console.log("here")

RenderFromDomNode({
    Component: UserEditForm,
    node: 'user-edit-form',
})

RenderFromDomNode({
    Component: VideoCarousel,
    node: 'video-carousel',
})
