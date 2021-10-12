import * as actionTypes from '../actions/actionTypes.js'

const initialState = {
  ingresses: [],
}

function ingressesReducer (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.RECEIVE_INGRESSES:
      // add logic here


      return { ...state, ingresses }
    default:
      return state;
  }
}

export default ingressesReducer;