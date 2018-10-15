import RenderFromDomNode from '../renderFromDomNode';
import SignupForm from '../components/SignupForm';

export default function render_artist_onboarding_page() {

    RenderFromDomNode({
        Component: SignupForm,
        node: 'onboarding',
    });

}
