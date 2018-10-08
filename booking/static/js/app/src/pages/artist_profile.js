import RenderFromDomNode from '../renderFromDomNode';
import UserEditForm from '../components/UserEditForm';
import EditBioForm from '../components/EditBioForm';
import { AudioEditForm, VideoEditForm } from '../components/DraggableCodeForms';
import { AudioCarousel, PhotoCarousel, VideoCarousel } from '../components/Carousels';
import PhotoCountIndicator from '../components/PhotoCountIndicator';
import { ClickToOpenDialog } from '../components/Dialog';

export default function render_artist_profile() {

    RenderFromDomNode({
        Component: ClickToOpenDialog({
                triggerSelector: '#open-edit-user-profile',
                DialogContent: UserEditForm,
            }),
        node: 'user-edit-form',
    });

    RenderFromDomNode({
        Component: ClickToOpenDialog({
            triggerSelector: '#open-edit-biography',
            DialogContent: EditBioForm,
        }),
        node: 'edit-bio-form',
    })

    RenderFromDomNode({
        Component: ClickToOpenDialog({
            triggerSelector: '.open-edit-audios',
            DialogContent: AudioEditForm,
        }),
        node: 'audio-edit-form',
    })

    RenderFromDomNode({
        Component: ClickToOpenDialog({
            triggerSelector: '.open-edit-videos',
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

    RenderFromDomNode({
        Component: PhotoCountIndicator,
        node: 'photo-count-indicator',
    });

}
