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
        <MasterNodeGraph yLabel={'Per Group(s)'} name={'API Server Request Latency[90th pctl]'} data={props.masterNode.serverAPILatency}/>
        <MasterNodeGraph  yLabel={'Per Resource(s)'} name={'API Server Success Requests'} data={props.masterNode.serverAPISuccessReq}/>
        <MasterNodeGraph  yLabel={'Per Group(add/s)'} name={'Controller Workqueue Adds'} data={props.masterNode.controllerAddCounter}/>
        <MasterNodeGraph  yLabel={'Per Operation(s)'} name={'ETCD Request Duration'} data={props.masterNode.etcdRequestRate}/>
      </Stack>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterNodeContainer);