import React from 'react';
import { AudioCarousel, ImageCarousel, VideoCarousel } from './components/Carousels';
import UserEditForm from './components/UserEditForm';
import RenderFromDomNode from './renderFromDomNode';

RenderFromDomNode({
    Component: UserEditForm,
    node: 'user-edit-form',
});

RenderFromDomNode({
    Component: VideoCarousel,
    node: 'video-carousel',
    className: 'carousel',
});

RenderFromDomNode({
    Component: AudioCarousel,
    node: 'audio-carousel',
    className: 'carousel',
});

RenderFromDomNode({
    Component: ImageCarousel,
    node: 'photo-carousel',
    className: 'carousel',
});
