import * as actionTypes from '../actions/actionTypes.js';
// TODO: import a library here to formate date/time from metadata creationTime)

const initialState = {
  pods: {},
}

function podsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.RECEIVE_PODS:
      const { cpuMetrics, memoryMetrics } = payload
      
      let pods = {};
      // add logic here
      // iterate through cpu metrics, memory metrics
      cpuMetrics.forEach( metric => {
        // console.log()
        // if this podName doesn't already exist in pods, create it and assign its value to values
        if (!pods[metric.metric.pod]) {
          pods[metric.metric.pod] = {
            name: metric.metric.pod,
            cpuValues: metric.values,
            displayMetrics: false,
            healthy: true,
            alive: true,
            displayMetrics: false,
          }
        }
        else {
          pods[metric.metric.pod].values = metric.values;
        }
        // podName
        
        // pod cpu metrics
        // pod memory metrics
       // push the object to the pods array 
      })
      memoryMetrics.forEach( metric => {
        if (!pods[metric.metric.pod]) {
          pods[metric.metric.pod] = {
            memoryValues: metric.values,
          }
        }
        else {
          pods[metric.metric.pod].memoryValues = metric.values;
        }  
      })
      // console.log('pods from pods reducer', pods);
      
      return {...state, pods};
    case actionTypes.DISPLAY_POD_METRICS:
      const podName = payload;
      console.log('trying to update state on click', podName);
      console.log(state.pods[podName].displayMetrics);
      const podsObj = state.pods;
      const pod = state.pods[podName];
      pod.displayMetrics = pod.displayMetrics ? false : true;

      podsObj[podName] = pod;
      return {...state, pods: podsObj};
    default: 
      return state;
  }


}

export default podsReducer;