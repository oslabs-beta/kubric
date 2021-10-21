import React from 'react';
import PodComponent from '../Components/PodComponent.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/metricsActionCreators.js'
import PodCpuComponent from '../Components/PodCpuComponent.jsx';

// TODOS: 
// get pods from Kubernetes and update metric names based on user selections
// if healthy property is set to true only if all metrics are below user-defined thresholds
// if a pod has been evicted, the alive property changes to false

const mapStateToProps = state => {
  // console.log('state from podscontainer: ',state);
  return {
    podCpuMetrics: state.metricsReducer.podCpuMetrics,
    pods: state.podsReducer.pods,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    renderPodMetrics: () => dispatch(actions.renderPodMetrics()),
  }
}


class PodsContainer extends React.Component {
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
    const podsElement = [];
    for (let pod in this.props.pods) {
      // console.log(pod);
      const { name, cpuValues, memoryValues, healthy, alive, displayMetrics } = this.props.pods[pod];
      // generate a pod component with properties specific to that pod
      podsElement.push(
        <PodComponent 
          // onClick={displayPodMetrics}
          // key={name} 
          name={name} 
          cpuValues={cpuValues} 
          memoryValues={memoryValues} 
          healthy={healthy} 
          alive={alive}
          displayMetrics={displayMetrics}
        />
      );
    }
    // console.log('podsElement after iteration', this.podsElement);
      
    // }))
    

    return (
      <div id="pods-container">
        {podsElement}
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PodsContainer);