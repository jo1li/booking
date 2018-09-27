import { AudioCarousel, VideoCarousel } from './components/Carousels';
import PhotoCarouselModal from './components/PhotoCarouselModal';
import EditBioForm from './components/EditBioForm';
import UserEditForm from './components/UserEditForm';
import { AudioEditForm, VideoEditForm } from './components/DraggableCodeForms';
import PhotoCountIndicator from './components/PhotoCountIndicator';
import RenderFromDomNode from './renderFromDomNode';

RenderFromDomNode({
    Component: UserEditForm,
    node: 'user-edit-form',
});

RenderFromDomNode({
    Component: EditBioForm,
    node: 'edit-bio-form',
})

RenderFromDomNode({
    Component: AudioEditForm,
    node: 'audio-edit-form',
})

RenderFromDomNode({
    Component: VideoEditForm,
    node: 'video-edit-form',
})

RenderFromDomNode({
    Component: AudioCarousel,
    node: 'audio-carousel',
    className: 'carousel',
});

RenderFromDomNode({
    Component: PhotoCarouselModal,
    node: 'photo-modal',
    className: 'carousel',
});

RenderFromDomNode({
    Component: VideoCarousel,
    node: 'video-carousel',
    className: 'carousel',
});

RenderFromDomNode({
    Component: PhotoCountIndicator,
    node: 'photo-count-indicator',
});
