import * as actionTypes from '../actions/actionTypes.js'

const initialState = {
  // configure this
  masterNodes: [],
  workerNodes: [],
};

function nodesReducer (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    // cases here


    default:
      return state;
  }
}

export default nodesReducer;