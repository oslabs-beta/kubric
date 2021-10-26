import axios from 'axios';
import * as actionTypes from './actionTypes.js';

export const fetchNodeMetrics = () => {
  return (dispatch) => {
    const nodesMetrcisUrl = 'http://localhost:3000/api/metrics'
    axios.get(nodesMetrcisUrl)
      .then( response => {
        dispatch(getNodes(response.data.CPUNodes, response.data.MemoryNodes, response.data.CPUSatValsNodes, response.data.WriteToDiskNodes));
      })
      .catch (err => console.log('error from inside fetchNodeMetrics'))
  }
}

export const fetchPodMetrics = (nodeName) => {
  return (dispatch) => {
    const nodesMetrcisUrl = `http://localhost:3000/api/metrics/getPodMetrics/${nodeName}`
    axios.get(nodesMetrcisUrl)
      .then( response => {
        dispatch(getPods(response.data.CPUPods, response.data.MemoryPods, response.data.WriteToDiskPods));        
      })
      .catch (err => console.log('error from inside fetchPodMetrics'))
  }
}

export const fetchMasterNodeMetrics = () => {
  return (dispatch) => {
    axios.get('/api/metrics/getMasterNode')
      .then(response => {
        dispatch(getMasterNode(response.data));
      })
      .catch(err => console.log('error from fetchMasterNodeMetrics'))
  };
};

export const getDefaultMetrics = metrics => {
  return {
    type: actionTypes.DEFAULT_METRICS_RECEIVED,
    payload: metrics,
  }
}

export const getPodCpuMetrics = metrics => {
  return {
    type: actionTypes.PODS_CPU_METRICS_RECEIVED,
    payload: metrics,
  }
}

export const getPodMemoryMetrics = metrics => {
  return {
    type: actionTypes.PODS_MEMORY_METRICS_RECEIVED,
    payload: metrics,
  }
}

export const getServerApiMetrics = metrics => {
  return {
    type: actionTypes.SERVERAPI_METRICS_RECEIVED,
    payload: metrics,
  }
}

export const renderPodMetrics = (podName, metrics) => {
  return {
    type: actionTypes.RENDER_POD_METRICS,
    payload: {podName, metrics}
  }
}

export const getPods = (cpuMetrics, memoryMetrics, writeToDiskPods) => {
  return {
    type: actionTypes.RECEIVE_PODS,
    payload: {cpuMetrics, memoryMetrics, writeToDiskPods},
  }
}

export const displayPodMetrics = (podName) => {  
  return {
    type: actionTypes.DISPLAY_POD_METRICS,
    payload: podName,
  }
}

export const getNodes = (nodesCpu, nodesMemory, CPUSatValsNodes, writeToDiskNodes) => {
  return {
    type: actionTypes.RECEIVE_NODES,
    payload: {nodesCpu, nodesMemory, CPUSatValsNodes, writeToDiskNodes}
  }
}

export const displayNodeMetrics = (nodeName) => {
  return {
    type: actionTypes.DISPLAY_NODE_METRICS,
    payload: nodeName,
  }
}

export const renderNodeMetrics = (nodeName, metrics) => {
  return {
    type: actionTypes.RENDER_NODE_METRICS,
    payload: {nodeName, metrics}
  }
}

export const getMasterNode = (metrics) => {
  return {
    type: actionTypes.RECEIVE_MASTER_NODE,
    payload: metrics,
  }
}