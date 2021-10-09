import * as actionTypes from '../actions/actionTypes.js'

const initialState = {
  deployments: [],
}

function deploymentsReducer (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.RECEIVE_DEPLOYMENTS:


      return { ...state, deployments };
    default: 
      return state;
  }

}

export default deploymentsReducer;