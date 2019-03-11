import RenderFromDomNode from '../renderFromDomNode';
import ArtistOnboardingForm from '../components/ArtistOnboardingForm';

export default function render_artist_onboarding_page() {

    RenderFromDomNode({
        Component: ArtistOnboardingForm,
        node: 'onboarding',
    });

}
