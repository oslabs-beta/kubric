import React from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import { connect } from 'react-redux';
//james

const mapStateToProps = state => {
  return {
    pods: state.podsReducer.pods
  }
}

class PodCpuComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    
  }

  render() {
    console.log('this is pod cpu component props', this.props)
    const {metric, pods} = this.props;
    console.log('this is pod metric', metric);

    const valuesToGraph = [];
    let podName;
    const getValues = (pods) => {
        // metric.forEach((eachPod) => {
        //   const podValues = []; // store values for a specific pod
        //   podName = eachPod.metric.pod;
        //   if (pods[podName].displayMetrics) {
        //     //array of all time stamps and their values of single pod
        //     eachPod.values.forEach((dataPoint) => {
        //         podsValues.push([parseFloat(dataPoint[0]), parseFloat(dataPoint[1])]);
        //     });
        //   };
        //   // valuesToGraph.push[podName] = podValues;
        //   valuesToGraph.push(
        //     {
        //       type: "line",
        //       text: podName,
        //       values: podValues,
        //     }
        //   );
        // })
      for (let pod in pods) {
        const podValues = [];
        if (!pods[pod].displayMetrics) {
          console.log('do we get here?');
          pods[pod].cpuValues.forEach(dataPoint => {
            podValues.push([parseFloat(dataPoint[0]), parseFloat(dataPoint[1])]);
          });
          valuesToGraph.push(
            {
              type: "line",
              text: pods[pod].name,
              values: podValues,
            }
          );
        }
      }    
    }
  //   [1634171448.491, 0.005295174118518516]
    getValues(pods);
    console.log('line 28', valuesToGraph);
    const dummy = [1,2]
    const podCpuGraphData = {
      type: 'mixed',
      title: {
          text: 'cpu by pods',
      },
      scaleX: {
          labels: 'Timestamp in some Unit',

      },
      scaleY: {
          labels: 'Memory Use Unit'
      },
      series: valuesToGraph
    }

    //when do i invoke get values???
    return (
        <div>
            The CPU Pods are below this. . . 
            <ZingChart data = {podCpuGraphData}>Pod Zing Chart</ZingChart>
        </div>
    )
  }

//   return (
//       <div>
//           Pod Component Rendered
//       </div>
//   )

  }

export default connect(mapStateToProps)(PodCpuComponent);