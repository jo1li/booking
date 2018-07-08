import _ from 'lodash';

const createReducer = (initialState, reduceObj) => {
  return (state = initialState, action) => {
    const { type } = action;
    const reduceFunc = reduceObj[type] || _.identity;

    return reduceFunc(state, action);
  };
};

export default createReducer;
