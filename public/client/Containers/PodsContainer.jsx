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
  return {
    podCpuMetrics: state.metricsReducer.podCpuMetrics,
    pods: state.metricsReducer.podList,
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
  podsElement = [];

  // ASSUMPTION: pods will be an array of objects and be accessed through props???
  pods = [
    {
      dateCreated: 123,
      metric1: 30,
      metric2: 10,
      metric3: 45,
      metric4: 67,
      healthy: true,
      alive: true,
    },
    {
      dateCreated: 124,
      metric1: 40,
      metric2: 90,
      metric3: 80,
      metric4: 67,
      healthy: false,
      alive: true,
    },
    {
      dateCreated: 125,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
    {
      dateCreated: 126,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
    {
      dateCreated: 127,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
    {
      dateCreated: 128,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
    {
      dateCreated: 129,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
    {
      dateCreated: 130,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
    {
      dateCreated: 131,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
    {
      dateCreated: 132,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
    {
      dateCreated: 133,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
    {
      dateCreated: 134,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
    {
      dateCreated: 135,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
    {
      dateCreated: 136,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
    {
      dateCreated: 137,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
    {
      dateCreated: 138,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
    {
      dateCreated: 139,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
    {
      dateCreated: 140,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
    {
      dateCreated: 141,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
    {
      dateCreated: 142,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
  ]

  // iterate through an array pods from the Kubernetes cluster and build an out an array of Pod Components to render:
  render ()
  {
    this.pods.forEach((pod => {
    // deconstruct necessary properties from each pod 
      const { dateCreated, metric1, metric2, metric3, metric4, healthy, alive } = pod;

      // generate a pod component with properties specific to that pod
      this.podsElement.push(<PodComponent 
        key={dateCreated} 
        metric1={metric1} 
        metric2={metric2} 
        metric3={metric3} 
        metric4={metric4} 
        healthy={healthy} 
        alive={alive}
      />);
    }))
    
    return (
      <div id="pods-container">
        {podsElement}
      </div>
    );
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(PodsContainer);