import * as actionTypes from '../actions/actionTypes.js';
// TODO: import a library here to formate date/time from metadata creationTime)

const initialState = {
  pods: [],
}

function podsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.RECEIVE_PODS:
      let pods = [];
    
      return {...state, pods};
    default: 
      return state;
  }


}

export default podsReducer;