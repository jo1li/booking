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
