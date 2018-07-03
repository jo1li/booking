
import createReducer from './createReducer';

function exampleFunction(state, action) {
  return {
    ...state,
    example: 'no',
  };
}

const initialState = {
    example: 'yes'
}

export default createReducer(initialState, {
    ['testing']: exampleFunction,
});