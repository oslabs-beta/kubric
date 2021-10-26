import * as actionTypes from '../actions/actionTypes.js'

const initialState = {
  // configure this
  nodes: {},
};

function nodesReducer (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.RECEIVE_NODES: {
      const { nodesCpu, nodesMemory, CPUSatValsNodes, writeToDiskNodes } = payload; 
      console.log('nodes received', payload);  
      const nodes = {};

      nodesCpu.forEach ( metric => {
        if (!nodes[metric.metric.instance]) {
          nodes[metric.metric.instance] = {
            name: metric.metric.instance,
            cpuValues: metric.values,
            displayMetrics: false,
            healthy: true,
            alive: true,
          }
        }
        else {
          nodes[metric.metric.node].values = metric.values;
        }
      })
      nodesMemory.forEach( metric => {
          nodes[metric.metric.instance].memoryValues = metric.values;
      })
      CPUSatValsNodes.forEach( metric => {
        nodes[metric.metric.instance].CPUSatValsNodes = metric.values;
      });
      writeToDiskNodes.forEach( metric => {
        nodes[metric.metric.instance].writeToDiskNodes = metric.values;
      });



      return {...state, nodes};
    }

    case actionTypes.DISPLAY_NODE_METRICS:
      const nodeName = payload;

      const nodesObj = JSON.parse(JSON.stringify(state.nodes));
      const node = nodesObj[nodeName];

      node.displayMetrics = node.displayMetrics ? false : true;

      nodesObj[nodeName] = node;
      return {
        ...state,
        nodes: nodesObj,
      }
    default:
      return state;
  }
}

export default nodesReducer;