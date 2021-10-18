import axios from 'axios';
import * as actionTypes from './actionTypes.js';


export const getAppLogs = (queryObj) => { 
    return (dispatch, getState) => {
       const {name,field,value,all} = queryObj;
      const getAppLogsURL = 
      `http://localhost:3000/api/logs/app?
      name=${name}&field=${field}&value=${value}&all=${all}`
     // +`&start=${new Date(new Date().setDate(new Date().getDate() - 1)
     // ).toISOString()}&end=${new Date().toISOString()}&step=10m`;
      axios.get(getAppLogsURL)
        .then(response => {
          console.log('response from /api/logs/app', response.data.appLogs);
          
          console.log(response.data);
          
          dispatch(dispatchAppLogs(response.data));
        })
        .catch (err => console.log(`error in get app logs fetch: ${err}`))    
    }
  }
  export const getAppLogFields = () => { 
    return (dispatch, getState) => {
      const getAppLogFieldsURL = 'http://localhost:3000/api/logs/appFields';
      axios.get(getAppLogFieldsURL)
        .then(response => {
         console.log('response from /api/logs/appFields', response.data);
         const objToArray = []
         for(let index in response.data){
             objToArray.push({'index':index,
             'fields':response.data[index]})
         }
         //console.log(response.data);
         dispatch(dispatchAppLogFields(objToArray));
        })
        .catch (err => console.log(`error in get app fields fetch: ${err}`))    
    }
  }
  export const dispatchAppLogs = logs => {
    console.log(logs)
    return {
      type: actionTypes.APP_LOGS_RECEIVED,
      payload: logs,
    }
  }
  export const selectIndex = index => {
      return {
          type: actionTypes.SELECT_INDEX,
          payload: index
      }
  }
  export const dispatchAppLogFields = fields => {
    console.log(fields)
    return {
      type: actionTypes.APP_LOG_FIELDS_RECEIVED,
      payload: fields,
    }
  }
  