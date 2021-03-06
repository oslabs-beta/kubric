import React from 'react';
import ZingChart from 'zingchart-react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    pods: state.podsReducer.pods,
  }
}

const PodCpuComponent = (props) => {

  const { pods } = props;
  const valuesToGraph = [];

  // parses data and configures for graph
  const getValues = (pods) => {
    for (let pod in pods) {
      const podValues = [];
      
      if (pods[pod].displayMetrics) {
        pods[pod].cpuValues.forEach(dataPoint => {
          const date = new Date(dataPoint[0]*1000);
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const seconds = date.getSeconds();
          const time = `${hours}:${minutes}:${seconds}`;  
          
          podValues.push([time, parseFloat(dataPoint[1])]);
        });
        
        valuesToGraph.push(
          {
            type: "line",
            decimals:3,
            text: pods[pod].name,
            values: podValues,
          }
        );

      }
    }    
  }

  getValues(pods);

  const podCpuGraphData = {
    theme: 'dark',
    type: 'line',
    "globals": {
      "font-family": "Roboto",
      "border-radius" : 15,
    },

    title: {
        text: 'CPU Usage Rate',
        "font-size": "15em",
        "alpha": 1,
        "adjust-layout": true,
    },

    plot: {
      marker: {
        visible: false,
      },
      animation: {
        effect: "ANIMATION_FADE_IN",
        speed:"200"
      },
      decimals:3,
      tooltip: {
        text: "%vv at %kt time from %t",
        decimals:3,
      }
    },

    plotarea: {
      "margin": "dynamic",
      "margin-right": "60",
      'width':'100%',
      'height': '100%',
    },

    scaleX: {
      item: {
        fontWeight: 'normal',
      },
      label:{
        text: "Time(60m)"
      }
      
    },
    scaleY: {
      minValue:0,
      minorTicks: 9,
      item:{
        fontWeight: 'normal',
      },
      label:{
        text: props.yLabel
      },
    },

    crosshairX: {
      visible: false,
    },

    series: valuesToGraph,
  }

  return (
    <div className="chart"> 
      <ZingChart height="303" data = {podCpuGraphData}/>
    </div>
  )
}

export default connect(mapStateToProps, null)(PodCpuComponent);