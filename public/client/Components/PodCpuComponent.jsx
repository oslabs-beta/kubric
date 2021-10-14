import React from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
//james

function PodCpuComponent (props) {
  console.log('this is pod cpu component props', props)
  const {metric} = props;
  console.log('this is pod metric', metric);

  const valuesToGraph = [];
  let podName;
  const getValues = (podArray) => {
      metric.forEach((eachPod) => {
        podName = eachPod.metric.pod;
        //array of all time stamps and their values of single pod
        eachPod.values.forEach((dataPoint) => {
            valuesToGraph.push([parseFloat(dataPoint[0]), parseFloat(dataPoint[1])]);
        })
      }) 
      // console.log(valuesToGraph);
      // console.log(valuesToGraph[0])
      return valuesToGraph;
  }
//   [1634171448.491, 0.005295174118518516]
  getValues(metric);
  console.log('line 28', valuesToGraph);
  const dummy = [1,2]
  const podCpuGraphData = {
    type: 'line',
    title: {
        text: 'podName',
    },
    scaleX: {
        labels: 'Timestamp in some Unit',

    },
    scaleY: {
        labels: 'Memory Use Unit'
    },
    series: [
        {
          values: valuesToGraph[0],
        }
    ]
  }

  //when do i invoke get values???
  return (
      <div>
          The CPU Pods are below this. . . 
          <ZingChart data = {podCpuGraphData}>Pod Zing Chart</ZingChart>
      </div>
  )

//   return (
//       <div>
//           Pod Component Rendered
//       </div>
//   )

  }

export default PodCpuComponent;