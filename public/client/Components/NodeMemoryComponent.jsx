import React from 'react';
import ZingChart from 'zingchart-react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    nodes: state.nodesReducer.nodes
  }
}

const NodeMemoryComponent = (props) => {
  const { nodes } = props;
  const valuesToGraph = [];

  const getValues = (nodes) => {
    for (let node in nodes) {
      const nodeValues = [];
      
      if (nodes[node].displayMetrics) {
        nodes[node].memoryValues.forEach(dataPoint => {
          const date = new Date(dataPoint[0]*1000);
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const seconds = date.getSeconds();
          const time = `${hours}:${minutes}:${seconds}`;
          
          nodeValues.push([time, parseFloat(dataPoint[1])]);
        });
        valuesToGraph.push(
          {
            type: "line",
            text: nodes[node].name,
            values: nodeValues,
          }
        );
      }
    }    
  }

  getValues(nodes);
  
  const nodeMemoryGraphData = {
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
          <ZingChart height="303" data = {nodeMemoryGraphData}>Pod Zing Chart</ZingChart>
      </div>
  )
}

export default connect(mapStateToProps, null)(NodeMemoryComponent);