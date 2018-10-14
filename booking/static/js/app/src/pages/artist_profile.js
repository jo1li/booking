import RenderFromDomNode from '../renderFromDomNode';
import UserEditForm from '../components/UserEditForm';
import EditBioForm from '../components/EditBioForm';
import { AudioEditForm, VideoEditForm } from '../components/DraggableCodeForms';
import { AudioCarousel, VideoCarousel } from '../components/Carousels';
import PhotoCarouselModal from '../components/PhotoCarouselModal';
import PhotoModalButton from '../components/PhotoModalButton';
import EditPhotosButtonText from '../components/EditPhotosButtonText';
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
    });

    RenderFromDomNode({
        Component: ClickToOpenDialog({
            triggerSelector: '.open-edit-audios',
            DialogContent: AudioEditForm,
        }),
        node: 'audio-edit-form',
    });

    RenderFromDomNode({
        Component: ClickToOpenDialog({
            triggerSelector: '.open-edit-videos',
            DialogContent: VideoEditForm,
        }),
        node: 'video-edit-form',
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
        Component: ClickToOpenDialog({
            triggerSelector: '#open-photo-carousel',
            DialogContent: PhotoCarouselModal,
        }),
        node: 'photo-modal',
    });

    RenderFromDomNode({
        Component: PhotoModalButton,
        node: 'photo-modal-button',
    });

    RenderFromDomNode({
        Component: EditPhotosButtonText,
        node: 'edit-photos-button-text',
    });

};
