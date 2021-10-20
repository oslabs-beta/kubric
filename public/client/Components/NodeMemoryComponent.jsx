import React from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    nodes: state.nodesReducer.nodes
  }
}

class NodeMemoryComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    
  }

  render() {
    // console.log('this is pod cpu component props', this.props)
    const {metric, nodes} = this.props;
    // console.log('this is pod metric', metric);

    const valuesToGraph = [];
    let nodeName;
    const getValues = (nodes) => {
      for (let node in nodes) {
        const nodeValues = [];
        
        if (nodes[node].displayMetrics) {
          // console.log('do we get here?');
          nodes[node].values.forEach(dataPoint => {
            const date = new Date(dataPoint[0]);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            const milliseconds = date.getMilliseconds();
            const time = `${hours}:${minutes}:${seconds}:${milliseconds}`;
            
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
  //   [1634171448.491, 0.005295174118518516]
    getValues(nodes);
    // console.log('line 28', valuesToGraph);
    const dummy = [1,2]
    const nodeMemoryGraphData = {
      type: 'mixed',
      "globals": {
        "font-family": "Roboto",
        "background-color": "#79B4B7",
        "border-radius" : 5,
      },
      title: {
          text: 'Memory in MB Over Time',
          "font-color": "dark-grey",
          "font-size": "20em",
          "alpha": 1,
          "adjust-layout": true,
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
          labels: 'Timestamp in some Unit',
          "item": {
            'font-color': "dark-grey",
            'font-weight': 'normal',
          },
      },
      scaleY: {
          labels: 'Memory Use Unit',
          "item": {
            'font-color': "dark-grey",
            'font-weight': 'normal',
          },
      },
      "crosshair-x": {
        "line-width": "100%",
        "alpha": 0.18,
      },
      series: valuesToGraph
    }

    return (
        <div className="chart"> 
            <ZingChart  data = {nodeMemoryGraphData}>Pod Zing Chart</ZingChart>
        </div>
    )
  }

//   return (
//       <div>
//           Pod Component Rendered
//       </div>
//   )

  }

export default connect(mapStateToProps, null)(NodeMemoryComponent);