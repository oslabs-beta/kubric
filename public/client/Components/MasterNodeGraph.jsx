import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import ZingChart from 'zingchart-react';
import { makeStyles } from '@mui/styles';

const MasterNodeGraph = ({name, data}) => {
  const valuesToGraph = [];
  const getValues = (array) => {
    array.forEach(obj => {
      const graphObj = {};
      const graphValues =[];
      const graphName = obj.metric.resource || obj.metric.group || obj.metric.operation || obj.metric.name;
      obj.values.forEach(dataPoint => {
        const date = new Date(dataPoint[0]*1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        //  const milliseconds = date.getMilliseconds();
        //  const time = `${hours}:${minutes}:${seconds}:${milliseconds}`;
        const time = `${hours}:${minutes}:${seconds}`;  
            
        graphValues.push([time, parseFloat(dataPoint[1])]);
      })
      valuesToGraph.push(
        {
          type: "line",
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
      //"background-color": "#79B4B7",
      "border-radius" : 15,
    },
    title: {
       //can make it customizable
        text: `${name}`,
       // "font-color": "dark-grey",
        "font-size": "10em",
        "alpha": 1,
        "adjust-layout": true,
      
    },
     plot: {
      animation: {
        effect: "ANIMATION_FADE_IN"
    }
    //   'width':'100%',
    //   'height': '100%',
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
          //labels: 'Memory Use Unit',
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
    series: valuesToGraph
  }

  return (
    <ZingChart height="303" width="85%" data = {graphConfig}/>
  )
}

export default MasterNodeGraph;