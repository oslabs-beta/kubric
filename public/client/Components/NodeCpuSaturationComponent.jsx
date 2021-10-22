import React from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    nodes: state.nodesReducer.nodes,
  }
}

class NodeCpuSaturationComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    
  }

  render() {
    const {metric, nodes} = this.props;

    const valuesToGraph = [];
    let nodeName;
    const getValues = (nodes) => {
      for (let node in nodes) {
        const nodeValues = [];
        let nameShortened = nodes[node].name;
        nameShortened = nameShortened.slice(0,3) + "..." + nameShortened.slice(nameShortened.length-5,nameShortened.length) 
        console.log("nameShortened",nameShortened)
        if (nodes[node].displayMetrics) {
          nodes[node].CPUSatValsNodes.forEach(dataPoint => {
            const date = new Date(dataPoint[0]);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            const milliseconds = date.getMilliseconds();
            const time = `${hours}:${minutes}:${seconds}:${milliseconds}`;
            // const yDataVal = parseFloat(dataPoint[1]).toFixed(4)
            // console.log(yDataVal)
            nodeValues.push([time, parseFloat(dataPoint[1])]);
            
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
  //   [1634171448.491, 0.005295174118518516]
    getValues(nodes);
    // console.log('line 28', valuesToGraph);
    const dummy = [1,2]
    const nodeCpuSaturationGraphData = {
      theme: 'dark',
      type: 'line',
      "globals": {
        "font-family": "Roboto",
        //"background-color": "#79B4B7",
        "border-radius" : 15,
      },
      title: {
          text: 'CPU Saturation',
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

    //when do i invoke get values???
    return (
        <div className="chart"> 
            <ZingChart width="85%" height="303" data = {nodeCpuSaturationGraphData}/>
        </div>
    )
  }

  }

export default connect(mapStateToProps, null)(NodeCpuSaturationComponent);