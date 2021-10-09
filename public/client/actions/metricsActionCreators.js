import axios from 'axios';
import * as actionTypes from './actionTypes.js';

export const getDefaultMetrics = metrics => {
  return {
    type: actionTypes.DEFAULT_METRICS_RECEIVED,
    payload: metrics
  }
}