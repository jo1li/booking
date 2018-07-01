import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import VideoCarousel from './components/VideoCarousel';
import RenderFromDomNode from './renderFromDomNode';

RenderFromDomNode({
    Component: VideoCarousel,
    node: 'video-carousel',
})
