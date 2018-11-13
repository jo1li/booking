import _ from 'lodash';
import { decode } from 'he';

const decodeStringValues = (obj) => {
    for(let key of _.keys(obj)) {
        const value = obj[key];

        if(typeof obj[key] === 'object') {
            obj[key] = decodeStringValues(value);
        }

        if(typeof obj[key] === 'string') {
            obj[key] = decode(value);
        }
    }

    return obj;
}

const getStateWithDefaults = (state) => {
    const initialStateDefaults = {
        // false denotes videos haven't been loaded in to state, an array indicates they have
        videos: false,
        audios: false,
    }

    return _.assign({}, initialStateDefaults, state);
};

const loadInitialState = () => {
    const windowState = window.initialState || {};
    const stateWithoutHtmlEntities = decodeStringValues(_.assign({}, windowState));
    const stateWithDefaults = getStateWithDefaults(stateWithoutHtmlEntities);
    return stateWithDefaults;
};

export default loadInitialState;
