import React from 'react';
import NodeComponent from '../Components/NodeComponent.jsx';
import { connect } from 'react-redux';
import * as actions from '../actions/metricsActionCreators.js'
import List from '@mui/material/List';
import { alpha } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import Paper from '@mui/material/Paper';

const mapStateToProps = state => {
  return {
    nodes: state.nodesReducer.nodes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    renderNodeMetrics: () => dispatch(actions.renderNodeMetrics()),
  }
}

const NodesContainer = (props) => {
  const nodesElement = [];
  let keyCount = 1;

  for (let node in props.nodes) {
    const { name, cpuValues, memoryValues, healthy, alive, displayMetrics } = props.nodes[node];

    nodesElement.push(
      <NodeComponent 
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
    <div>
      {/* <Paper style={{maxHeight: 200, overflow: 'auto'}}> */}
        <List sx={{ maxHeight: 200, overflow: 'auto', width: '100%', bgcolor: alpha('#F5F5F5', .40) }}>
          {nodesElement}
        </List>
      {/* </Paper> */}
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(NodesContainer);