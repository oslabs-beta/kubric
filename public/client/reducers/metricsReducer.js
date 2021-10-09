import * as actionTypes from '../actions/actionTypes.js'

const initialState = {
  // configure this
}

function metricsReducer (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // list and configure cases
    default:
      return state;
  }
}

export default metricsReducer;