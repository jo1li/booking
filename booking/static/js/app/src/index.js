import render_artist_profile_page from './pages/artist_profile';
import render_artist_signup_page from './pages/artist_signup';
import { ARTIST_PROFILE, ARTIST_SIGNUP } from './constants';

import RenderFromDomNode from './renderFromDomNode';
import NavigationBar from './components/nav/NavigationBar';

import _ from 'lodash';


// Global components
RenderFromDomNode({
    Component: NavigationBar,
    node: 'main-navigation-bar',
})

// Page level components
const RENDERERS_BY_PAGE = {
    [ARTIST_PROFILE]: render_artist_profile_page,
    [ARTIST_SIGNUP]: render_artist_signup_page,
};

_.get(RENDERERS_BY_PAGE, window.CONFIGS.REACT_PAGE_NAME, log_no_page_defined)();

function log_no_page_defined() {
    console.log("No page defined");
}
