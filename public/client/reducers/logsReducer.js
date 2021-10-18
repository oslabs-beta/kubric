import * as actionTypes from '../actions/actionTypes.js'


const initialState = {
  appLogFields: [],
  appLogs: [],
  selectedIndex:0
}
export default function metricsReducer (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.APP_LOG_FIELDS_RECEIVED: {
        let appLogFields = payload;
        console.log('appLog Fields', appLogFields);
        return {
          ...state,
          appLogFields,
        }
      }
      case actionTypes.APP_LOGS_RECEIVED: {
        let appLogs = payload;
        console.log('appLogs', appLogs);
        return {
          ...state,
          appLogs,
        }
      }
      case actionTypes.SELECT_INDEX: {
        let index = payload;
        console.log('selected index', index);
        return {
          ...state,
          selectedIndex:index,
        }
      }
      default: 
        return state;
    }
  }
  
  