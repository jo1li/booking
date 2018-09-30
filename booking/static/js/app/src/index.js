import { AudioCarousel, PhotoCarousel, VideoCarousel } from './components/Carousels';
import EditBioForm from './components/EditBioForm/EditBioForm';
import UserEditForm from './components/UserEditForm';
import { AudioEditForm, VideoEditForm } from './components/DraggableCodeForms';
import RenderFromDomNode from './renderFromDomNode';
import { ClickToOpenDialog } from './components/modal/DialogDomEvents';


RenderFromDomNode({
    Component: ClickToOpenDialog({
        triggerSelector: 'open-edit-user-profile',
        DialogContent: UserEditForm,
    }),
    node: 'user-edit-form',
});

RenderFromDomNode({
    Component: ClickToOpenDialog({
        triggerSelector: 'open-edit-biography',
        DialogContent: EditBioForm,
    }),
    node: 'edit-bio-form',
})

RenderFromDomNode({
    Component: ClickToOpenDialog({
        triggerSelector: 'open-edit-audios',
        DialogContent: AudioEditForm,
    }),
    node: 'audio-edit-form',
})

RenderFromDomNode({
    Component: ClickToOpenDialog({
        triggerSelector: 'open-edit-videos',
        DialogContent: VideoEditForm,
    }),
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
