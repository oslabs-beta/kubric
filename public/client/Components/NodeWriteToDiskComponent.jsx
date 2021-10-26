import React from 'react';
import ZingChart from 'zingchart-react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    nodes: state.nodesReducer.nodes,
  }
}

const NodeWriteToDiskComponent = (props) => {
  const { nodes } = props;
  const valuesToGraph = [];

  const getValues = (nodes) => {
    for (let node in nodes) {
      const nodeValues = [];
      let nameShortened = nodes[node].name;
      nameShortened = nameShortened.slice(0,3) + "..." + nameShortened.slice(nameShortened.length-5,nameShortened.length) 
    
      if (nodes[node].displayMetrics) {
        nodes[node].writeToDiskNodes.forEach(dataPoint => {
          const date = new Date(dataPoint[0]*1000);
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const seconds = date.getSeconds();
          const time = `${hours}:${minutes}:${seconds}`;
          
          nodeValues.push([time, parseFloat(dataPoint[1])*0.000001]);
        });
        valuesToGraph.push(
          {
            type: "line",
            text:  nameShortened,
            values: nodeValues,
            min: 0,
          }
        );
      }
    }    
  }

  getValues(nodes);

  const nodeWriteToDiskData = {
    theme: 'dark',
    type: 'line',
    "globals": {
      "font-family": "Roboto",
      "border-radius" : 15,
    },

    title: {
        text: 'Write to Disk Rate [5m] in MB',
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
          <ZingChart height="303" data = {nodeWriteToDiskData}/>
      </div>
  )
}

export default connect(mapStateToProps, null)(NodeWriteToDiskComponent);