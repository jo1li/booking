import _ from 'lodash';
import * as ActionPartials from '../constants/actionPartials';
import * as Reducers from '../constants/reducers';

/**
 * creates equivalent function as:
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
const actionPartialsActionCreators = _.fromPairs(
  _.reduce(Reducers, (arr, type) => {
    let upperCaseType = type.toUpperCase()
    let updateAction = `${upperCaseType}${ActionPartials._CREATE_OR_UPDATE}`;
    let deleteAction = `${upperCaseType}${ActionPartials._DELETE}`;
    arr.push([_.camelCase(updateAction), createAction(updateAction)]);
    arr.push([_.camelCase(deleteAction), createAction(deleteAction)]);

    return arr;
  },[])
);

export default actionPartialsActionCreators;
