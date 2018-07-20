import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import _ from 'lodash'
import * as REDUCER_CONSTS from '../constants/reducers';
import createReducer from '../utils/createReducer';
import defaultCrud from './defaultCrud';
import crudConfigs from './crudConfigs';

/**
 * Reducers have been boiled down to a config object
 * replacing the switch statement. The config is imported
 * and added to combined reduce configs.
 */
const combineReducerConfigs = {
    form,
}

// TODO: this documentation is probably wrong and also the names of all the variables should be changed
/**
 * Takes an object of reducer configs in the form:
 *
 *  {
 *      reducername: {
 *          state: {}
 *          actions: {
 *              [actionName]: (state, action) => {},
 *          }
 *      }
 *      otherReducer...
 *  }
 *
 *  and an object of constants that creates reducers with default functions in the form:
 *
 *  {
 *      REDUCER_NAME: 'reducer name'
 *  }
 *
 *  If a reducer from a config has the same name from a reducer made from a constant, both reducers
 *  will be merged together.
 */
export function createReducers(reducerConfigs, reducerConstants) {
    const reducersFromConstants = _.reduce(reducerConstants, (obj, key) => (obj[key] = defaultCrud(key), obj), {});

    console.log(reducersFromConstants);
    debugger;

    return combineReducers({
        ...reducersFromConstants,
        ...reducerConfigs,
    });
}

export default createReducers(combineReducerConfigs, REDUCER_CONSTS);
