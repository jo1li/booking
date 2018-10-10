import render_artist_profile_page from './pages/artist_profile'
import render_artist_signup_page from './pages/artist_signup'
import render_artist_onboarding_page from './pages/artist_onboarding'
import { ARTIST_PROFILE, ARTIST_SIGNUP, ARTIST_ONBOARDING } from './constants'
import _ from 'lodash'

var RENDERERS_BY_PAGE = {};
RENDERERS_BY_PAGE[ARTIST_PROFILE] = render_artist_profile_page;
RENDERERS_BY_PAGE[ARTIST_SIGNUP] = render_artist_signup_page;
RENDERERS_BY_PAGE[ARTIST_ONBOARDING] = render_artist_onboarding_page;

_.get(RENDERERS_BY_PAGE, window.CONFIGS.REACT_PAGE_NAME, log_no_page_defined)();

function log_no_page_defined() {
    console.log("No page defined");
}
