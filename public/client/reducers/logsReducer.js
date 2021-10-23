import * as actionTypes from '../actions/actionTypes.js'


const initialState = {
  appLogFields: [],
  appLogIndices: [],
  appLogs: [],
  selectedFields: [],
  selectedIndex:0
}
export default function metricsReducer (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.APP_LOG_FIELDS_RECEIVED: {
        let appLogFields = payload.fields;
        let appLogIndices = payload.indices;
        return {
          ...state,
          appLogFields,
          appLogIndices
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
        const index = payload;
        const selectFields = state.appLogFields.slice()[index];
        console.log('selected index', index);
        return {
          ...state,
          selectedIndex:index,
          selectedFields:selectFields
        }
      }
      default: 
        return state;
    }
  }
  
  