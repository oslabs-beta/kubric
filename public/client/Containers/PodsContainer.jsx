import React, { useEffect } from 'react';
import PodComponent from '../Components/PodComponent.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/metricsActionCreators.js'
import { alpha } from '@mui/material';
import List from '@mui/material/List';


const mapStateToProps = state => {
  return {
    pods: state.podsReducer.pods,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPodMetrics: (nodeName) => dispatch(actions.fetchPodMetrics(nodeName)),
  }
}

function PodsContainer(props) {

  useEffect(() => {
    props.fetchPodMetrics(props.nodeName);
  }, []);

  const podsElement = [];
  let keyCount = 1;

  for (let pod in props.pods) {
    const { name, cpuValues, memoryValues, healthy, alive, displayMetrics } = props.pods[pod];
    
    podsElement.push(
      <PodComponent 
        key={keyCount}
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
  
  return (
    <div id="pods-container">
        <List sx={{ maxHeight: 200, overflow: 'auto', width: '100%', bgcolor: alpha('#F5F5F5', .40)  }}>
          {podsElement}
        </List>
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(PodsContainer);