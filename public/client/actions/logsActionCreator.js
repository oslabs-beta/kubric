import axios from 'axios';
import * as actionTypes from './actionTypes.js';


export const getAppLogs = (name,field,value,all) => { 
    return (dispatch, getState) => {
      const getAppLogsURL = 
      'http://localhost:3000/api/logs/app?name='+
      `${name}`+'&field='+`${field}`+'&value='+`${value}`+'&all='+`${all}`
     // +`&start=${new Date(new Date().setDate(new Date().getDate() - 1)
     // ).toISOString()}&end=${new Date().toISOString()}&step=10m`;
      axios.get(getAppLogsURL)
        .then(response => {
          console.log('response from /api/logs/app', response.appLogs);
          
          // console.log(response.data);
        //   dispatch(getDefaultMetrics(response.data.defaultMetrics));
        //   dispatch(getPodCpuMetrics(response.data.CPUPods));
        //   dispatch(getPodMemoryMetrics(response.data.MemoryPods));
        //   dispatch(getServerApiMetrics(response.data.serverAPI));
        })
        .catch (err => console.log(`error in get app logs fetch: ${err}`))    
    }
  }
  export const getAppLogFields = () => { 
    return (dispatch, getState) => {
      const getAppLogFieldsURL = 'http://localhost:3000/api/logs/appFields';
      axios.get(getAppLogFieldsURL)
        .then(response => {
          console.log('response from /api/logs/appFields', response.appLogFields);
          
          // console.log(response.data);
        //   dispatch(getDefaultMetrics(response.data.defaultMetrics));
        //   dispatch(getPodCpuMetrics(response.data.CPUPods));
        //   dispatch(getPodMemoryMetrics(response.data.MemoryPods));
        //   dispatch(getServerApiMetrics(response.data.serverAPI));
        })
        .catch (err => console.log(`error in get app logs fetch: ${err}`))    
    }
  }
  export const dispatchAppLogs = logs => {
    console.log(logs)
    return {
      type: actionTypes.APP_LOGS_RECEIVED,
      payload: logs,
    }
  }
  