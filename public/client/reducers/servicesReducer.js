import * as actionTypes from '../actions/actionTypes.js'

const initialState = {
  services: [],
}

function servicesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.RECEIVE_SERVICES:
      // add logic here




      return { ...state, services };
    default:
      return state;
  }
}

export default servicesReducer;