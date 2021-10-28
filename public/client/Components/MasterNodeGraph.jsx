import { propsToClassKey } from '@mui/styles';
import React, {useEffect, useState} from 'react';
import ZingChart from 'zingchart-react';

const MasterNodeGraph = ({name, data,yLabel}) => {
  const valuesToGraph = [];
  
  const getValues = (array) => {
    array.forEach(obj => {
      const graphValues =[];
      const graphName = obj.metric.resource || obj.metric.group || obj.metric.operation || obj.metric.name;
    
      obj.values.forEach(dataPoint => {
        const date = new Date(dataPoint[0]*1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const time = `${hours}:${minutes}:${seconds}`;  
            
        graphValues.push([time, parseFloat(dataPoint[1])]);
      })
      valuesToGraph.push(
        {
          type: "line",
          decimals:3,
          text: graphName,
          values: graphValues,
        }
      );
    })  
  }

  getValues(data);
  
  const graphConfig = {
    theme: 'dark',
    type: 'line',
    "globals": {
      "font-family": "Roboto",
      "border-radius" : 15,
    },

    title: {
        text: `${name}`,
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
        speed:"50"
      },
      decimals:3,
      tooltip: {
        text: "%vv at %kt from %t",
        decimals:3,
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
      label:{
        text: "Time(60m)"
      }
      
    },
    scaleY: {
      minValue:0,
      minorTicks: 9,
      label:{
        text: yLabel
      },
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
    <ZingChart height="303" data = {graphConfig}/>
  )
}

export default MasterNodeGraph;