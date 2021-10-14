import React from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';

function HistogramComponent (props) {
  const { help, name, type, values, aggregator } = props.metric;
  const charts = [];
  // console.log('histogram vals', values);
  const chartName = help.split(',')[0];
  // console.log(chartName);

  const getValues = (values) => {
    const valuesList = [];
    // console.log(values);
    const chartDataPoints = {}
    const chartInfo = {
      chartValues: [],
      chartLabel: [],
    }

    values.forEach(val => {
      // console.log(val.value);
      const { value, labels } = val;
      let labelsList = '';
      if (!Object.keys(labels).length) {
        labelsList = 'there are no labels for this value';
      } else {
        // iterate through labels list and add their key/value to labelsList
        for (let key in labels) {
          labelsList += ` ${key}: ${labels[key]},`
        }
        labelsList;
      }
      if (!chartDataPoints[val.labels.kind]) {
        chartDataPoints[val.labels.kind] = [val.labels.le, val.val]
      } else {
        chartDataPoints[val.labels.kind].push(val.labels.le);
      }
      chartInfo.chartValues.push(value);
      chartInfo.chartLabel.push(labels);
      // console.log("chartLabels", chartInfo.chartValues);
      // console.log("chartLabels", chartInfo.chartLabel);
      valuesList.push(<li><span>{value} </span><span>  | <i>{labelsList}</i></span></li>);
    })
    // console.log('valuesList', valuesList);
    // console.log(chartInfo);
    // console.log('histogram datapoints: ', chartDataPoints);
    let histogram = {
      type: 'bar',
      "globals": {
        "font-family": "Roboto",
        "background-color": 'black',
      },
      title: {
        'text': chartName,
        "font-color": "whitesmoke",
        "backgroundColor": "none",
        "font-size": "20em",
        "alpha": 1,
        "adjust-layout": true,
      },
      "plot": {
        'width':'100%',
        'height': '100%'
      },
      "plotarea": {
          "margin": "dynamic",
          'width':'100%',
          'height': '100%'
      },
      "scale-x":{  
        "item": {
          'font-color': "whitesmoke",
          'font-weight': 'normal',
        },
        label: {
          text: "Kind",
          "font-size": "15em",
          'font-color': "whitesmoke",
        },
        "values": chartInfo.chartLabel,  
      },
      "scale-y":{  
        "item": {
          'font-color': "whitesmoke",
          'font-weight': 'normal',
        },
        label: {
          text: "Time",
          "font-size": "15em",
          "font-color": "whitesmoke",
        },
        format: '%v ms',
        text: "Measure of Garbage"
      },
      "plot": {
        "bars-space-left": 0.05,
        "bars-space-right": 0.05,
        "animation": {
          "effect": "ANIMATION_SLIDE_BOTTOM",
          "sequence": 0,
          "speed": 800,
          "delay": 800
        }
      },
      "crosshair-x": {
        "line-width": "100%",
        "alpha": 0.18,
      },
      series: [{
        values: chartInfo.chartValues,
        'background-color': "white", 
        alpha: .75, 
      }]
    }
    if (!valuesList.length) {
      return 'none';
    }
    return (
      <div>
        {/* <ul>
          {valuesList}
        </ul> */}
        <ZingChart data={ histogram }>Zing Chart</ZingChart>
      </div>
    )
  };

  return (
    <div className="histogramComponent">
      {getValues(values)}
      <ul className={type}>
        {/* <li>Description: {help}</li> */}
        {/* <li>({name})</li> */}
        {/* <li>{getValues(values)}</li>  */}
      </ul>
    </div>
  );
}

export default HistogramComponent;