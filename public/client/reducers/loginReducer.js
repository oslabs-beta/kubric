import * as actionTypes from '../actions/actionTypes.js'

const initialState = {
  vaildUser : false,
};

export default function loginReducer (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case actionTypes.RECEIVE_lOGIN: {
      const validUser = payload;
      console.log('In reducer valid login value', validUser);
      return {
        ...state,
        validUser,
      };
    }
  }
}
