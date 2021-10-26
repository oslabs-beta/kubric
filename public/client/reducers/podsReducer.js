import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
  pods: {},
}

function podsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.RECEIVE_PODS:
      const { cpuMetrics, memoryMetrics, writeToDiskPods } = payload      
      let pods = {};

      cpuMetrics.forEach( metric => {
        if (!pods[metric.metric.pod]) {
          pods[metric.metric.pod] = {
            name: metric.metric.pod,
            cpuValues: metric.values,
            displayMetrics: true,
            healthy: true,
            alive: true,
          }
        }
        else {
          pods[metric.metric.pod].cpuValues = metric.values;
        }
      })
      
      memoryMetrics.forEach( metric => {
        pods[metric.metric.pod].memoryValues = metric.values;
      })

      for(let pod in pods){
        writeToDiskPods.forEach(metric => {
          if(pod === metric.metric.pod){
            pods[pod].writeToDiskValues = metric.values;
            return;
          } 
        })
        if(!pods[pod].writeToDiskValues) pods[pod].writeToDiskValues = [];
      }
      
      return {...state, pods};

    case actionTypes.DISPLAY_POD_METRICS:
      const podName = payload;
      const podsObj = JSON.parse(JSON.stringify(state.pods));
      const pod = podsObj[podName];
      
      pod.displayMetrics = pod.displayMetrics ? false : true;
      podsObj[podName] = pod;

      return {...state,pods: podsObj};

    default: 
      return state;
  }
}

export default podsReducer;