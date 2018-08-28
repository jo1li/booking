import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import * as REDUCER_CONSTS from '../constants/reducers';
import _ from 'lodash'
import defaultCrud from './defaultCrud';

const readyReducers = {
    form,
}

export function createReducers(readyReducers, reducerConstants) {
    // Create reducers for each of the imported constants using the default
    // CRUD configs
    const reducersFromConstants = _.reduce(
        reducerConstants,
        (obj, key) => {
            obj[key] = defaultCrud(key);
            return obj;
        },
        {}
    );

    // Combine these with imported ready-made reducers
    return combineReducers({
        ...reducersFromConstants,
        ...readyReducers,
    });
}

export default createReducers(readyReducers, REDUCER_CONSTS);
