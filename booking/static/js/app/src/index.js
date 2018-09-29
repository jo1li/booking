import { AudioCarousel, PhotoCarousel, VideoCarousel } from './components/Carousels';
import EditBioForm from './components/EditBioForm';
import UserEditForm from './components/UserEditForm';
import { AudioEditForm, VideoEditForm } from './components/DraggableCodeForms';
import RenderFromDomNode from './renderFromDomNode';
import NavigationBar from './components/nav/NavigationBar';

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
    Component: PhotoCarousel,
    node: 'photo-carousel',
    className: 'carousel',
});

RenderFromDomNode({
    Component: NavigationBar,
    node: 'main-navigation-bar',
})