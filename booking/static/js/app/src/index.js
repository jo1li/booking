import { AudioCarousel, PhotoCarousel, VideoCarousel } from './components/Carousels';
import EditBioForm from './components/EditBioForm';
import UserEditForm from './components/UserEditForm';
import SignupForm from './components/SignupForm';
import { AudioEditForm, VideoEditForm } from './components/DraggableCodeForms';
import PhotoCountIndicator from './components/PhotoCountIndicator';
import RenderFromDomNode from './renderFromDomNode';

console.log("configs: ", window.CONFIGS);

switch(window.CONFIGS.REACT_PAGE_NAME) {
    case 'ARTIST_PROFILE':
        render_artist_profile();
        break;
    case 'ARTIST_SIGNUP':
        render_artist_signup();
        break;
    default:
        break;
}

function render_artist_profile() {

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
        Component: PhotoCountIndicator,
        node: 'photo-count-indicator',
    });

}

function render_artist_signup() {

    RenderFromDomNode({
        Component: SignupForm,
        node: 'musician-signup',
    });

}
