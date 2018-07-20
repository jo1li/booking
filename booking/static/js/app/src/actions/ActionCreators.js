import fromPairs from 'lodash/fromPairs';
import map from 'lodash/map';
import camelCase from 'lodash/camelCase';
import merge from 'lodash/merge';
import reduce from 'lodash/reduce';
import * as ActionTypes from '../constants/actionTypes';
import * as ActionPartials from '../constants/actionPartials';
import * as Reducers from '../constants/reducers';


/**
 * creates equivilant function as:
 *
 * function functionName(data) {
 *  return {
 *    type: types.ACTION_TO_PERFORM,
 *    data,
 *  };
 * }
 */
const createAction = (type) => {
    return (data) => {
       return {type, data};
    }
}

/**
 * Creates an action function that can be dispatched.
 * The function name will be the action name in camel case.
 * example:
 *
 * you have created an action type in constants/ActionTypes.js
 *  export const NAVIGATE_HOME = 'navigateHome';
 *
 *  The following function will be created from this action type.
 *
 *  function navigateHome(data) {
 *      return {
 *          type: NAVIGATE_HOME,
 *          data
 *      }
 *  }
 */
const actionTypsActionCreators =  fromPairs(
     map(ActionTypes, (type) =>  [ camelCase(type), createAction(type)])
);

/**
 * Creates action functions combining each constant from constants/Reducers.js
 * with each constant from constants/ActionPartials.js.
 * example:
 * constants/Reducers.js
 *  export const USERS = 'users';
 *
 * constants/ActionPartials.js
 * export const _CREATE_OR_UPDATE = '_CREATE_OR_UPDATE'
 * export const _DELETE = '_DELETE'
 *
 * The following functions will be produced.
 *
 *  function usersCreateOrUpdate(data) {
 *      return {
 *          type: USERS_CREATE_OR_UPDATE,
 *          data
 *      }
 *  }
 *
 *  function usersDelete(data) {
 *      return {
 *          type: USERS_DELETE,
 *          data
 *      }
 *  }
 *
 * see reducers/defaultCrud.js for more.
 */
const actionPartialsActionCreators =  fromPairs(
     reduce(Reducers, (arr, type) =>  {
        let upperCaseType = type.toUpperCase()
        let updateAction = `${upperCaseType}${ActionPartials._CREATE_OR_UPDATE}`;
        let deleteAction = `${upperCaseType}${ActionPartials._DELETE}`;
       arr.push([ camelCase(updateAction), createAction(updateAction)]);
       arr.push([ camelCase(deleteAction), createAction(deleteAction)]);

       return arr;
    },[])
);

const actionCreators =  merge(actionTypsActionCreators, actionPartialsActionCreators);

export default actionCreators;
