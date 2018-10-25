import RenderFromDomNode from '../renderFromDomNode';
import UserEditForm from '../components/UserEditForm';
import EditBioForm from '../components/EditBioForm';
import SendArtistMessageForm from '../components/SendArtistMessageForm';
import { AudioEditForm, VideoEditForm } from '../components/DraggableCodeForms';
import PhotoEditForm from '../components/PhotoEditForm';
import { AudioCarousel, VideoCarousel } from '../components/Carousels';
import PhotoCarouselModal from '../components/PhotoCarouselModal';
import PhotoModalButton from '../components/PhotoModalButton';
import EditPhotosButton from '../components/EditPhotosButton';
import CoverPhoto from '../components/CoverPhoto';
import { ClickToOpenDialog } from '../components/Dialog';
import _ from 'lodash';

export default function render_artist_profile() {

    RenderFromDomNode({
        Component: ClickToOpenDialog({
                triggerSelector: '#open-send-artist-message-form',
                DialogContent: SendArtistMessageForm,
            }),
        node: 'send-artist-message-form',
    });

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
        Component: ClickToOpenDialog({
            triggerSelector: '#open-edit-photos',
            DialogContent: PhotoEditForm,
        }),
        node: 'photo-edit-form',
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
            triggerSelector: '#open-photo-carousel, #cover-photo-wrapper',
            DialogContent: PhotoCarouselModal,
            getIsDisabled: (state) => !_.size(state.photos),
        }),
        node: 'photo-modal',
    });

    RenderFromDomNode({
        Component: PhotoModalButton,
        node: 'open-photo-carousel',
    });

    RenderFromDomNode({
        Component: EditPhotosButton,
        node: 'open-edit-photos',
    });

    RenderFromDomNode({
        Component: CoverPhoto,
        node: 'cover-photo-wrapper',
    });

};
