import render_artist_profile_page from './pages/artist_profile'
import render_artist_signup_page from './pages/artist_signup'
import { ARTIST_PROFILE, ARTIST_SIGNUP } from './constants'
import _ from 'lodash'

var RENDERERS_BY_PAGE = {};
RENDERERS_BY_PAGE[ARTIST_PROFILE] = render_artist_profile_page;
RENDERERS_BY_PAGE[ARTIST_SIGNUP] = render_artist_signup_page;

_.get(RENDERERS_BY_PAGE, window.CONFIGS.REACT_PAGE_NAME, error_or_noop_function)();

function error_or_noop_function() {
    console.log("No page defined");
}
