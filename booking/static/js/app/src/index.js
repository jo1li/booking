import React from 'react';
import IframeCarousel from './components/IframeCarousel';
import UserEditForm from './components/UserEditForm';
import AddVideoButton from './components/AddVideoButton';
import RenderFromDomNode from './renderFromDomNode';

RenderFromDomNode({
    Component: UserEditForm,
    node: 'user-edit-form',
})

RenderFromDomNode({
    Component: AddVideoButton,
    node: 'user-video-empty-add',
})

RenderFromDomNode({
    Component: IframeCarousel,
    node: 'video-carousel',
    className: 'iframe-carousel',
})

RenderFromDomNode({
    Component: IframeCarousel,
    node: 'audio-carousel',
    className: 'iframe-carousel',
})
