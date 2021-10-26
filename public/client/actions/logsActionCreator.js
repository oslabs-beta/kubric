import axios from 'axios';
import * as actionTypes from './actionTypes.js';


export const getAppLogs = (queryObj) => { 
   return (dispatch) => {
       const {name,field,value,all} = queryObj;
       console.log("name",name)
       console.log("getAppLogsReached",JSON.stringify(queryObj))
      const getAppLogsURL = 
      `http://localhost:3000/api/logs/app?
      unimportant=1&name=${name}&field=${field}&value=${value}&all=${all}`
     // +`&start=${new Date(new Date().setDate(new Date().getDate() - 1)
     // ).toISOString()}&end=${new Date().toISOString()}&step=10m`;
      axios.get(getAppLogsURL)
        .then(response => {
          console.log('response from /api/logs/app', response.data.appLogs);
          dispatch(dispatchAppLogs(response.data.appLogs));
          return response;
        })
        .catch (err => console.log(`error in get app logs fetch: ${err}`))    
    }
  }
  export const getAppLogFields = () => { 
    return (dispatch) => {
      const getAppLogFieldsURL = 'http://localhost:3000/api/logs/appFields';
     axios.get(getAppLogFieldsURL)
        .then(response => {
         console.log('response from /api/logs/appFields', response.data);
         let fieldArray = [];
         let indexArray = [];
         for(let index in response.data){
             indexArray.push(index);
             fieldArray.push(response.data[index]);
         }
         //console.log(response.data);
         dispatch(dispatchAppLogFields(fieldArray,indexArray));
         return response;
        })
        .catch (err => console.log(`error in get app fields fetch: ${err}`))    
    }
  }
  export const dispatchAppLogs = logs => {
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
  export const dispatchAppLogFields = (fields,indices) => {
    return {
      type: actionTypes.APP_LOG_FIELDS_RECEIVED,
      payload: {'fields':fields,'indices':indices}
    }
  }
  