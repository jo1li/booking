import React from 'react';
import VideoCarousel from './components/VideoCarousel';
import UserEditForm from './components/UserEditForm';
import VideoEditForm from './components/VideoEditForm';
import RenderFromDomNode from './renderFromDomNode';

RenderFromDomNode({
    Component: UserEditForm,
    node: 'user-edit-form',
})

RenderFromDomNode({
    Component: VideoEditForm,
    node: 'video-edit-form',
})

RenderFromDomNode({
    Component: VideoCarousel,
    node: 'video-carousel',
})
