import React from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
//james

function PodCpuComponent (props) {
  console.log('this is pod cpu component props', props)
  const {metric} = props;
  console.log('this is pod metric', metric);
//   const getValues = (podArray) => {
//     //   const podName = metric.pod;
//     const podValues = [];
//       podArray.forEach((pod) => {
//         const podName = pod.metric.pod;
//         //array of all time stamps and their values of single pod
//         const values = pod.values
//         podValues.push(values)
//       }) 
//       return podValues;
//   }

//   const podCpuGraphData = {
//     type: 'line',
//     title: {
//         text: 'Pod Graph',
//     },
//     series: [
//         {label : getValues(podValues)},
//     ]
//   }

  return (
      <div>
          {/* <ZingChart podData= {podCpuGraphData}>Pod Zing Chart</ZingChart> */}
      </div>
  )

//   return (
//       <div>
//           Pod Component Rendered
//       </div>
//   )

  }

export default PodCpuComponent;