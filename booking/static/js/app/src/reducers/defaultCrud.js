import isArray from 'lodash/isArray';
import keyBy from 'lodash/keyBy';
import isObject from 'lodash/isObject';
import each from 'lodash/each';
import createReducer from '../utils/createReducer';
import Immute from 'object-path-immutable';
import {
  _DELETE,
  _CREATE_OR_UPDATE
} from '../constants/actionPartials';

/**
 * For Immutable.orderedMap();
 * @param reducerName
 * @returns {{}}
 *
 * The purpose of defaultCrud is to make generic collection creation, update and deletion
 * for a slice of state really easy to spin up.
 *
 * given a reducerName default CRUD actions will be created.
 * For example given a reducerName of 'todos' you will get actions:
 *
 * 1. TODOS_CREATE_OR_UPDATE
 * 2. TODOS_DELETE
 *
 * dispatches to TODOS_CREATE_OR_UPDATE can accept:
 *
 * 1. an array of records where each record has an id. This will create records in state.
 * 2. an object with an id. this will create or update a record in state
 * 3. an an object without an id. this will create or update an object in state
 *
 * dispatches to TODOS_DELETE can accept:
 *
 * 1. an array of objects with id. this will delete those records in state.
 * 2. an object with an id. this will delete that record.
 * 3. passing nothing will reset all records.
 *
 *
 */
const defaultCrud = function (reducerName, configs) {
  const key = (configs && configs.key) || 'id';
  const initialState = {};
  return createReducer(initialState,
  {
      [`${reducerName.toUpperCase()}${_CREATE_OR_UPDATE}`]: (state, action) => {
        // will merge an array of items or an individual object
        if (isArray(action.data)) {
          state = Object.assign({}, state, keyBy(action.data, key))
        } else if (isObject(action.data) && action.data[key]) {
          state = Immute.assign(state, action.data[key], action.data);
        } else if (!action.data[key]) {
          //TODO prevent this from blowing away data if there is already data in state
          state = Object.assign({}, state, action.data);
        }


        return state;
      },

      [`${reducerName.toUpperCase()}${_DELETE}`]: (state, action) => {
        if (isArray(action.data)) {
          each(action.data, (obj) => {
            state = Immute.del(state, obj[key]);
          });
        } else if (isObject(action.data) && action.data[key]) {
          state = Immute.del(state, action.data[key]);
        } else {
          state = {};
        }

        return state;
      }
    }
  );
};

export default defaultCrud;
