import RenderFromDomNode from '../renderFromDomNode';
import OnboardingForm from '../components/SignupForm/OnboardingForm';

export default function render_artist_onboarding_page() {

    RenderFromDomNode({
        Component: OnboardingForm,
        node: 'onboarding',
    });

}
