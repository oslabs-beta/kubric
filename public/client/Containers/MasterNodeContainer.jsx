import React,{useEffect, useState} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/metricsActionCreators.js';
import Stack from '@mui/material/Stack';
import MasterNodeGraph from '../Components/MasterNodeGraph.jsx';

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMasterNodeMetrics: () => dispatch(actions.fetchMasterNodeMetrics())
  }
}

const mapStateToProps = (state) => {
  return {
    masterNode: {
      serverAPILatency: state.masterNodeReducer.serverAPILatency,
      serverAPISuccessReq: state.masterNodeReducer.serverAPIsuccessReq,
      controllerAddCounter: state.masterNodeReducer.controllerAddCounter,
      etcdRequestRate: state.masterNodeReducer.etcdRequestRate,
    }  
  }
}

function MasterNodeContainer(props) {

  useEffect(()=>{
    props.fetchMasterNodeMetrics();
  },[])

  return (
    <div>
      <Stack 
        spacing={2}
        sx={{
          display:"flex", 
          justifyContent:'space-evenly',
        }}>
        <MasterNodeGraph name={'Kubernetes Server API Latency [90th percentile]'} data={props.masterNode.serverAPILatency}/>
        <MasterNodeGraph name={'Kubernetes Server API Success Request Rate [5m]'} data={props.masterNode.serverAPISuccessReq}/>
        <MasterNodeGraph name={'Controller Workqueue Add Rate [5m]'} data={props.masterNode.controllerAddCounter}/>
        <MasterNodeGraph name={'etcd Request Rate [5m]'} data={props.masterNode.etcdRequestRate}/>
      </Stack>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterNodeContainer);