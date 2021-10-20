import React,{useEffect} from 'react';
import { connect } from 'react-redux';
// import CounterComponent from './CounterComponent.jsx';
// import GaugeComponent from './GaugeComponent.jsx';
// import HistogramComponent from './HistorgramComponent.jsx';
import * as actions from '../actions/metricsActionCreators.js';
import MetricsComponent from '../Components/MetricsComponent.jsx';
import NodeXContainer from './NodeXContainer.jsx';
import NodeChartContainer from './NodeChartContainer.jsx';
import PodChartContainer from './PodChartContainer.jsx';
import PodsContainer from './PodsContainer.jsx';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

const mapDispatchToProps = dispatch => {
  return {
    fetchDefaultMetrics: () => dispatch(actions.fetchDefaultMetrics()),
  }
}
const useStyles = makeStyles({
  root:{
    background: 'rgba(69,172,120,0.52)',
    border: 0,
    borderRadius: 4,
    boxShadow: '6px 2px 3px -1px rgba(0,0,0,0.75)',
    color: 'white',
    height: '66%', 
    width: '100%', 
    borderRadius: 10,
    padding: '0 30px'
  },
})
// TODO: what props are needed from state here?

function MetricsContainer(props) {
  const classes = useStyles();
  useEffect(() => {
    props.fetchDefaultMetrics();
  });
  
    // return dev containing the metrics array to the screen
    console.log('metrics container rendered')
    return (
      <div id="metricsContainer"> 
       <Container
       classes={{
        root: classes.root
      }} >
        <PodChartContainer/>
      
        Pods
        <PodsContainer/>
      
        <NodeChartContainer/>
      
        Nodes
        <NodeXContainer/>
        </Container>
        {/* <button onClick={this.forceUpdateHandler}> Render Default Metrics</button> */}
        {/* <MetricsComponent 
          metrics={this.props.defaultMetrics} 
          podCpuMetrics={this.props.podCpuMetrics} 
          pods={this.props.pods}
          nodes={this.props.nodes}
        /> */}
      </div>
    )
  
}


export default connect(null, mapDispatchToProps)(MetricsContainer);