import React from 'react';
import NodeComponent from '../Components/NodeComponent.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/metricsActionCreators.js'
import NodeCpuComponent from '../Components/NodeCpuComponent.jsx';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
// TODOS: 
// get pods from Kubernetes and update metric names based on user selections
// if healthy property is set to true only if all metrics are below user-defined thresholds
// if a pod has been evicted, the alive property changes to false

const mapStateToProps = state => {
  console.log('state from nodexcontainer: ',state);
  return {
    nodes: state.nodesReducer.nodes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    renderNodeMetrics: () => dispatch(actions.renderNodeMetrics()),
  }
}


class NodesContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  // array to hold pod components to render
  // podsElement = [];

  

  // iterate through an array pods from the Kubernetes cluster and build an out an array of Pod Components to render:
  render () {
    // console.log('render of pods container', this.props);
    // this.props.pods.forEach((pod => {
    // // deconstruct necessary properties from each pod 
    //   const { name, cpuValues, memoryValues } = pod;
    // console.log('render of pods container, ', this.props.pods );
    const nodesElement = [];
    let keyCount = 1;
    for (let node in this.props.nodes) {
      // console.log(pod);
      const { name, cpuValues, memoryValues, healthy, alive, displayMetrics } = this.props.nodes[node];
      // generate a pod component with properties specific to that pod
      console.log('node name', name);
      nodesElement.push(
        <NodeComponent 
          // onClick={displayPodMetrics}
          keyCount={keyCount} 
          name={name} 
          cpuValues={cpuValues} 
          memoryValues={memoryValues} 
          healthy={healthy} 
          alive={alive}
          displayMetrics={displayMetrics}
        />
      );
      keyCount ++;
    }
    // console.log('podsElement after iteration', this.podsElement);
      
    // }))
    

    return (
      <div>
        <Paper style={{maxHeight: 200, overflow: 'auto'}}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {nodesElement}
        </List>
        </Paper>
      </div>
    );
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(NodesContainer);