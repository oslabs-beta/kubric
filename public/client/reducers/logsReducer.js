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
        console.log("hello for app log reducer case",payload)
        let idIterate = 0;
        let appLogs = payload.map((log)=>{
          let filteredLog = {}
          filteredLog.id = log._source._id ? log._source._id : idIterate++;
          filteredLog.message = log._source.message ? log._source.message : '';
          if(log._source.msg) filteredLog.message = log._source.msg;
          if(log._source.kubernetes.pod_name) filteredLog.podName = log._source.kubernetes.pod_name;
          if(log._source.level) filteredLog.level = log._source.level;
          if(log._source.kubernetes.host) filteredLog.host = log._source.kubernetes.host;
          filteredLog.timestamp = log._source.timestamp ? log._source.timestamp : '';
          //if(log.@timestamp) filteredLog.timestamp = log.@timestamp;
          
          if(log._source.time) filteredLog.timestamp = log._source.time;
          if(filteredLog.timestamp) {
            const date = new Date(filteredLog.timestamp).toLocaleDateString('en-US',{ year: "numeric", month: "long", day: "numeric" } )
            const time = new Date(filteredLog.timestamp).toLocaleTimeString('en-US', { hour12: false } )
            filteredLog.timestamp = date.concat(" " + time);
          }
             return filteredLog;
        });
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
  
  