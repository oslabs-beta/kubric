import * as actionTypes from '../actions/actionTypes.js'

const initialState = {
  // configure this
}

function metricsReducer (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // list and configure cases
    case actionTypes.DEFAULT_METRICS_RECEIVED:
      let { metrics } = payload;
      let charts = [];

      metrics.forEach(metric => {
        console.log(metric);
      })

      // UPDATE THIS 
      return state;
    default:
      return state;
  }
}

export default metricsReducer;