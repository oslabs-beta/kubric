import { dispatch } from 'd3-dispatch';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/metricsActionCreators.js'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

// TODOS:
// what does rendering of a Pod look like? 

const mapStateToProps = state => {
  // console.log(this);
  // console.log('from pods comp: ', state.podsReducer.pods[this.props.name] ? state.podsReducer.pods[this.props.name] : {})
  return {
    node: state.podsReducer.nodes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    displayNodeMetrics: (nodeName) => dispatch(actions.displayNodeMetrics(nodeName)),
  }
}

function NodeComponent (props) {
 // constructor(props) {
  //  super(props);
    // this.displayPodMetrics = this.displayPodMetrics.bind(this);
  //}
  // displayPodMetrics() {
  //   if (!this.displayMetrics) {
  //     console.log('display the metrics!')
  //   }
  // }
  // console.log('props of each podcomponent: ', props)
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (nodeName) => () => {
    const currentIndex = checked.indexOf(nodeName);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(nodeName);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.displayNodeMetrics(nodeName)
  }
    return (
      <div>
      <ListItem
      key={props.name}
      disablePadding
    >
      <ListItemButton role={undefined} onClick={handleToggle(props.name)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.indexOf(props.name) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': props.name }}
          />
        </ListItemIcon>
        <ListItemText style={{color:'black'}} id={props.name} primary={`Node ${props.name}`} />
      </ListItemButton>
    </ListItem>
      </div>
    );
  
};

export default connect(mapStateToProps, mapDispatchToProps)(NodeComponent);