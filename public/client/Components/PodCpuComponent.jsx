import React from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
//james

function PodCpuComponent (props) {
  console.log('this is pod cpu component props', props)
  const {metric} = props;
  console.log('this is pod metric', metric);

  let timeValues = [];
  let cpuUseValues = [];
  let podName;
  const getValues = (podArray) => {

      metric.forEach((eachPod) => {
        const podName = eachPod.metric.pod;
        //array of all time stamps and their values of single pod
        const timeValue = eachPod.values[0];
        const cpuUseValue = eachPod.values[1];
        timeValues.push(timeValue);
        cpuUseValues.push(cpuUseValue);
      }) 
      console.log('cpuValues here', cpuUseValues);
  }
//   getValues(metrics)
  const podCpuGraphData = {
    type: 'line',
    title: {
        text: 'Pod Graph',
    },
    scaleX: {
        labels: 'Timestamp in some Unit',

    },
    scaleY: {
        labels: 'Memory Use Unit'
    },
    series: [
        {values : cpuUseValues},
    ]
  }

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