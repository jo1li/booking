import React from 'react';
import IframeCarousel from './components/IframeCarousel';
import UserEditForm from './components/UserEditForm';
import RenderFromDomNode from './renderFromDomNode';

RenderFromDomNode({
    Component: UserEditForm,
    node: 'user-edit-form',
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
