import React from 'react';
import IframeCarousel from './components/IframeCarousel';
import UserEditForm from './components/UserEditForm';
import RenderFromDomNode from './renderFromDomNode';

const CONFIGS = window.CONFIGS || {};

RenderFromDomNode({
    Component: UserEditForm,
    node: 'user-edit-form',
})

// TODO: Use `CONFIGS` to set the image base url (in other PR)
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
