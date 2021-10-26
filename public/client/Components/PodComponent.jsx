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
    pod: state.podsReducer.pods
  }
}

const mapDispatchToProps = dispatch => {
  return {
    displayPodMetrics: (podName) => dispatch(actions.displayPodMetrics(podName)),
  }
}


// class PodComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     // this.displayPodMetrics = this.displayPodMetrics.bind(this);
//   }
//   // displayPodMetrics() {
//   //   if (!this.displayMetrics) {
//   //     console.log('display the metrics!')
//   //   }
//   // }
//   // console.log('props of each podcomponent: ', props)
//   render() {
    
//     return (
//       <div className= "pod-component" onClick={() => this.props.displayPodMetrics(this.props.name)}>
//           {this.props.name}
//       </div>
//     );
//   }
// };

function PodComponent (props) {
  console.log
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (podName) => () => {
    const currentIndex = checked.indexOf(podName);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(podName);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.displayPodMetrics(podName)
  }
    return (
      <div>
      <ListItem
      key={props.name}
      count={props.keyCount}
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
        <ListItemText style={{color:'black'}} id={props.name} primary={`Pod ${props.keyCount}`} secondary={props.name} />
      </ListItemButton>
    </ListItem>
      </div>
    );
  
};


export default connect(mapStateToProps, mapDispatchToProps)(PodComponent);


