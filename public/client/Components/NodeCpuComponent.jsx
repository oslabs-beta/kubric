import React from 'react';
import ZingChart from 'zingchart-react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    nodes: state.nodesReducer.nodes,
  }
}

const NodeCpuComponent = (props) => {

  const { nodes } = props;

  const valuesToGraph = [];
  
  const getValues = (nodes) => {
    for (let node in nodes) {
      const nodeValues = [];
      let nameShortened = nodes[node].name;
      nameShortened = nameShortened.slice(0,3) + "..." + nameShortened.slice(nameShortened.length-5,nameShortened.length) 
      
      if (nodes[node].displayMetrics) {
        nodes[node].cpuValues.forEach(dataPoint => {
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
            decimals:3,
            text:  nameShortened,
            values: nodeValues,
            min: 0,
          }
        );
      }
    }    
  }

  getValues(nodes);

  const nodeCpuGraphData = {
    theme: 'dark',
    type: 'line',
    "globals": {
      "font-family": "Roboto",
      "border-radius" : 15,
    },

    title: {
        text: 'CPU Utilization',
        "font-size": "15em",
        "alpha": 1,
        "adjust-layout": true,
    },

    plot: {
      marker: {
        visible: false,
      },
      decimals:3,
      animation: {
        effect: "ANIMATION_FADE_IN",
        speed: "200"
      },
      tooltip: {
         text: "%vv at %kt from %t",
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
      label:{
        text: "Per Node"
      },
      minValue:0,
      minorTicks: 9,
      format: "%v%",
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
          <ZingChart  height="303" data = {nodeCpuGraphData}/>
      </div>
  )
}

export default connect(mapStateToProps, null)(NodeCpuComponent);