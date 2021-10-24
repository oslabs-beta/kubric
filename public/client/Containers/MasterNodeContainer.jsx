import React,{useEffect, useState} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/metricsActionCreators.js';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { WifiProtectedSetupSharp } from '@mui/icons-material';
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

    //more automated approach, but requires less flexibility 
    // const graphs = [];
    // for(let graph in props.masterNode){
    //   graphs.push(<MasterNodeGraph name={graph} data={props.masterNode[graph]}/>)
    // }

    // const stacks = [];
    // for(let i = 0; i < graphs.length-1; i+=2){
    //   stacks.push(<Stack direction="row"
    //   spacing={2}
    //   sx={{display:"flex", 
    //   flexDirection:"row",
    //   justifyContent:'space-evenly'}}>{graphs.slice(i,i+2)}</Stack>)    
    // }

    return (
      <div>
        <Stack direction="row"
          spacing={2}
          sx={{display:"flex", 
          flexDirection:"row",
          justifyContent:'space-evenly'}}>
          <MasterNodeGraph name={'Kubernetes Server API Latency [90th percentile]'} data={props.masterNode.serverAPILatency}/>
          <MasterNodeGraph name={'Kubernetes Server API Success Request Rate [5m]'} data={props.masterNode.serverAPISuccessReq}/>
        </Stack>
        <Stack direction="row"
          spacing={2}
          sx={{display:"flex", 
          flexDirection:"row",
          justifyContent:'space-evenly'}}>
          <MasterNodeGraph name={'Controller Workqueue Add Rate [5m]'} data={props.masterNode.controllerAddCounter}/>
          <MasterNodeGraph name={'etcd Request Rate [5m]'} data={props.masterNode.etcdRequestRate}/>
        </Stack>
      </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterNodeContainer);