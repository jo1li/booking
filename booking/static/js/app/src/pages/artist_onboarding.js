import RenderFromDomNode from '../renderFromDomNode';
import ArtistOnboarding from '../components/ArtistOnboarding';

export default function render_artist_onboarding_page() {

    RenderFromDomNode({
        Component: ArtistOnboarding,
        node: 'musician-onboarding',
    });

}
