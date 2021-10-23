import React from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import { connect } from 'react-redux';
//james

const mapStateToProps = state => {
  return {
    pods: state.podsReducer.pods,
    nodes: state.nodesReducer.nodes,
  }
}

class PodCpuComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    
  }

  render() {
    const {metric, pods} = this.props;

    const valuesToGraph = [];
    let podName;
    const getValues = (pods) => {
      for (let pod in pods) {
        const podValues = [];
        
        if (pods[pod].displayMetrics) {
          pods[pod].cpuValues.forEach(dataPoint => {
            const date = new Date(dataPoint[0]*1000);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            //   const milliseconds = date.getMilliseconds();
            //   const time = `${hours}:${minutes}:${seconds}:${milliseconds}`;
            const time = `${hours}:${minutes}:${seconds}`;  
            
            podValues.push([time, parseFloat(dataPoint[1])]);
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
    // console.log('line 28', valuesToGraph);
    const dummy = [1,2]
    const podCpuGraphData = {
      theme: 'dark',
      type: 'line',
      "globals": {
        "font-family": "Roboto",
        //"background-color": "#79B4B7",
        "border-radius" : 15,
      },
      title: {
          text: 'CPU Usage Rate [5m]',
         // "font-color": "dark-grey",
          "font-size": "15em",
          "alpha": 1,
          "adjust-layout": true,
        
      },
       plot: {
        animation: {
          effect: "ANIMATION_FADE_IN"
        }
      },
      plotarea: {
        "margin": "dynamic",
        "margin-right": "30",
        'width':'100%',
        'height': '100%',
      },
      // "plot": {
      //   'width':'100%',
      //   'height': '100%',
      // },
      // "plotarea": {
      //     "margin": "dynamic",
      //     'width':'100%',
      //     'height': '100%',
      // },
      scaleX: {
        // labels: 'Timestamp in some Unit',
        "item": {
          //'font-color': "dark-grey",
          'font-weight': 'normal',
        },
        
        },
      scaleY: {
            //labels: 'CPU Use Unit',
        minValue:0,
        minorTicks: 9,
        item:{
            'font-weight': 'normal',
        }
      },
      "crosshair-x": {
        "line-width": "100%",
        "alpha": 0.18,
      },
      series: valuesToGraph,
    }

    //when do i invoke get values???
    return (
        <div className="chart"> 
            <ZingChart height="303" data = {podCpuGraphData}>Pod Zing Chart</ZingChart>
        </div>
    )
  }

//   return (
//       <div>
//           Pod Component Rendered
//       </div>
//   )

  }

export default connect(mapStateToProps, null)(PodCpuComponent);