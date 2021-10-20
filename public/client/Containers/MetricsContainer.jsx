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


const mapDispatchToProps = dispatch => {
  return {
    fetchDefaultMetrics: () => dispatch(actions.fetchDefaultMetrics()),
  }
}

// TODO: what props are needed from state here?

function MetricsContainer(props) {
  useEffect(() => {
    props.fetchDefaultMetrics();
  });
  
    // return dev containing the metrics array to the screen
    console.log('metrics container rendered')
    return (
      <div className="metricsContainer"> 
       
        <PodChartContainer/>
      
        Pods
        <PodsContainer/>
      
        <NodeChartContainer/>
      
        Nodes
        <NodeXContainer/>
    
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