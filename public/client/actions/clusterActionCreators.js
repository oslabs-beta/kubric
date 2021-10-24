import * as actionTypes from './actionTypes.js';

export const renderCluster = boolean => {
  console.log('render cluster action creator valid user value', boolean);
  return {
    type: actionTypes.RECEIVE_LOGIN,
    payload: boolean,
  };
};