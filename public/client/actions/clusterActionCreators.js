//define dispatch action
//import
import * as actionTypes from './actionTypes.js';



export const renderCluster = boolean => {
    // console.log(metrics)
    return {
      type: actionTypes.RECEIVE_LOGIN,
      payload: boolean,
    }
  }