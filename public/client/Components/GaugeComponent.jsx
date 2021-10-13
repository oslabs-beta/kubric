import React from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';

function GaugeComponent (props) {
  const { help, name, type, values, aggregator } = props.metric;

  // iterate through values array and create li items of each value and their labels 
  const getValues = (values) => {
    const valuesList = [];
    // console.log(values);
    const chartValues = [];
    const chartLabel = [];
    values.forEach(val => {
      // console.log(val.value);
      const { value, labels } = val;
      console.log('I am the val', val)
      let labelsList = '';
      if (!Object.keys(labels).length) {
        labelsList = 'there are no labels for this value';
      } else {
        // iterate through labels list and add their key/value to labelsList
        for (let key in labels) {
          labelsList += ` ${key}: ${labels[key]},`
        }
        // labelsList
      }
      chartValues.push(value);
      chartLabel.push(labels);
      valuesList.push(<li><span>{value} </span><span>  | <i>{labelsList}</i></span></li>);
    })
    // console.log('valuesList', valuesList);
    const myData = {
      type: 'line',
      title: {
        text: 'Metrics for a Default Metric',
        fontSize: 30,
      },
      scaleX : {
        label: {text: chartLabel},
        labels: {}
      },
      scaleY : {
        label: {text: 'Y axix Name'}
      },
      series: [
        { values: chartValues }
      ]
    }
    if (!valuesList.length) {
      return 'none';
    }
    return (
      <div>
        <ul>
          {valuesList}
        </ul>
        <ZingChart data={ myData }> Zing Chart </ZingChart>
      </div>
    )
  };

  return (
    <div className="gaugeComponent">
      <ul className={type}>
        <li>Description: {help}</li>
        <li>({name})</li>
        <li>Values: {getValues(values)}</li> 
      </ul>
    </div>
  );
}

export default GaugeComponent;