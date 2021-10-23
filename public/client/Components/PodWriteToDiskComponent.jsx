import React from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    pods: state.podsReducer.pods
  }
}

const PodWriteToDiskComponent = (props) => {
  // console.log('this is pod cpu component props', this.props)
  // console.log('this is pod metric', metric);

  const valuesToGraph = [];
  const getValues = (pods) => {
    for (let pod in pods) {
      const podValues = [];
      if (pods[pod].displayMetrics) {
        // console.log('do we get here?');
        pods[pod].writeToDiskValues.forEach(dataPoint => {
          const date = new Date(dataPoint[0]*1000);
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const seconds = date.getSeconds();
        //   const milliseconds = date.getMilliseconds();
        //   const time = `${hours}:${minutes}:${seconds}:${milliseconds}`;
          const time = `${hours}:${minutes}:${seconds}`;  
          podValues.push([time, parseFloat(dataPoint[1])/1000]);
        });
        valuesToGraph.push({
          type: "line",
          text: pods[pod].name,
          values: podValues,
        });
        }
      }    
    }
    getValues(props.pods);
    
    const podWriteToDiskGraphData = {
      theme: 'dark',
      type: 'line',
      "globals": {
        "font-family": "Roboto",
        //"background-color": "#79B4B7",
        "border-radius" : 15,
      },
      title: {
          text: 'Write to Disk Rate [5m] in KB',
         // "font-color": "dark-grey",
          "font-size": "15em",
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
        <div className="chart"> 
            <ZingChart height="303" data = {podWriteToDiskGraphData}>Write to Disk rate</ZingChart>
        </div>
    )
  }

//   return (
//       <div>
//           Pod Component Rendered
//       </div>
//   )


export default connect(mapStateToProps, null)(PodWriteToDiskComponent);