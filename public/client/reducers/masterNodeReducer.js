import * as actionTypes from '../actions/actionTypes.js'

const initialState = {
  serverAPILatency: [],
  serverAPIsuccessReq: [],
  controllerAddCounter: [],
  etcdRequestRate: [],
};

export default function masterNodeReducer (state = initialState, action) {
  const {type, payload} = action;
  
  switch(type){
    case actionTypes.RECEIVE_MASTER_NODE: {
      const {serverAPILatency, serverAPIsuccessReq, controllerAddCounter, etcdRequestRate} = payload;
      return {
        ...state,
        serverAPILatency,
        serverAPIsuccessReq,
        controllerAddCounter,
        etcdRequestRate,
      };
    }

    default:
      return state;
  };
};