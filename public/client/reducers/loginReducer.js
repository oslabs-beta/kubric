import * as actionTypes from '../actions/actionTypes.js'

const initialState = {
  validUser : false,
};

export default function loginReducer (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case actionTypes.RECEIVE_LOGIN: {
      const validUser = payload;
      console.log('In reducer valid login value', validUser);
      return {
        ...state,
        validUser,
      };
    }
    default: 
      return state;
  }
}
