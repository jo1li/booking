import RenderFromDomNode from '../renderFromDomNode';
import SignupForm from '../components/SignupForm';

export default function render_artist_signup_page() {

    RenderFromDomNode({
        Component: SignupForm,
        node: 'musician-signup',
    });

}
