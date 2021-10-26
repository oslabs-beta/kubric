import * as actionTypes from '../actions/actionTypes.js'

const initialState = {
  defaultMetrics: [],
  podCpuMetrics: [],
  podMemoryMetrics: [],
  serverApiMetrics: [],
}

export default function metricsReducer (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case actionTypes.DEFAULT_METRICS_RECEIVED: {
      let defaultMetrics = payload;
      
      return {
        ...state,
        defaultMetrics,
      }
    }
    case actionTypes.PODS_CPU_METRICS_RECEIVED: {
      let podCpuMetrics = payload;

      return {
        ...state,
        podCpuMetrics,
      }
    }
    case actionTypes.PODS_MEMORY_METRICS_RECEIVED: {
      let podMemoryMetrics = payload;

      return {
        ...state,
        podMemoryMetrics,
      }
    }
    case actionTypes.SERVERAPI_METRICS_RECEIVED: {
      let serverApiMetrics = payload;

      return {
        ...state,
        serverApiMetrics,
      }
    
    }
    default: 
      return state;
  }
}

