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
      // console.log('I am the val', val)
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

    //get y axix value from name property from metric. Usually the last word of that string.
    function getYAxisValue (name) {
      let nameAsArray = name.split('_');
      // console.log('y axis name', nameAsArray[nameAsArray.length-1]);
      let result = nameAsArray[nameAsArray.length-1];
      if (result === 'bytes') result = 'Megabytes';
      return result;
    }

    const myData = {
      type: 'line',
      title: {
        text: help,
        fontSize: 30,
      },
      scale : {
        'size-factor': 0.5,
      },
      scaleX : {
        label: chartLabel,
        labels: {},
        // values: '0:10:1',
      },
      scaleY : {
        label: {text: getYAxisValue(name)},
        // values: '0:100:25',
      },
      series: [
        { values: chartValues }
      ]
    }
    //where to put you? If label value has only one value/ don't render graph, don't render that graph
    if (myData.scaleX.label.length <= 1) {};
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

  // ZingChart.render({

  // })

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