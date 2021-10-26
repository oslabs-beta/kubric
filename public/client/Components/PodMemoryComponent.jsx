import React from 'react';
import ZingChart from 'zingchart-react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    pods: state.podsReducer.pods
  }
}

const PodMemoryComponent = (props) => {
  const { pods } = props;
  const valuesToGraph = [];
  
  const getValues = (pods) => {
    for (let pod in pods) {
      const podValues = [];
      
      if (pods[pod].displayMetrics) {
        pods[pod].memoryValues.forEach(dataPoint => {
          const date = new Date(dataPoint[0]*1000);
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const seconds = date.getSeconds();
          const time = `${hours}:${minutes}:${seconds}`;  
          
          podValues.push([time, parseFloat(dataPoint[1])*0.000001]);
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

  getValues(pods);
  
  const podMemoryGraphData = {
    theme: 'dark',
    type: 'line',
    "globals": {
      "font-family": "Roboto",
      "border-radius" : 15,
    },

    title: {
        text: 'Memory Usage in MB',
        "font-size": "15em",
        "alpha": 1,
        "adjust-layout": true,
    },

    plot: {
      marker: {
        visible: false,
      },
      animation: {
        effect: "ANIMATION_FADE_IN"
      },
      tooltip: {
        text: "%vt at %kt time from %t"
      }
    },

    plotarea: {
      "margin": "dynamic",
      "margin-right": "30",
      'width':'100%',
      'height': '100%',
    },

    scaleX: {
      item: {
        fontWeight: 'normal',
      },
      
    },
    scaleY: {
      minValue:0,
      minorTicks: 9,
      item:{
        fontWeight: 'normal',
      }
    },

    crosshairX: {
      visible: false,
    },

    series: valuesToGraph,
  }

  return (
    <div className="chart"> 
        <ZingChart height="303" data = {podMemoryGraphData}>Pod Zing Chart</ZingChart>
    </div>
  )
}

export default connect(mapStateToProps, null)(PodMemoryComponent);