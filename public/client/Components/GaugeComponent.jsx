import React from 'react';

const sampleGaugeObj = {
  help:"Start time of the process since unix epoch in seconds.",
  name:"process_start_time_seconds",
  type:"gauge",
  values:[{
    value:1633816140,
    labels:{}
  }],
  aggregator:"omit",
}

function GaugeComponent (props) {
  const { help, name, type, values, aggregator } = props.metric;

  // iterate through values array and create li items of each value and their labels 
  const getValues = (values) => {
    const valuesList = [];
    console.log(values);
    values.forEach(val => {
      console.log(val.value);
      const { value, labels } = val;
      let labelsList = '';
      if (!Object.keys(labels).length) {
        labelsList = 'there are no labels for this value';
      } else {
        
        labelsList
      }
      valuesList.push(<li><span>{value} </span><span>  | <i>{labelsList}</i></span></li>);
    })
    console.log('valuesList', valuesList);
    return (
      <ul>
        {valuesList}
      </ul>
    )
  };

  return (
    <div className="gaugeComponent">
      <ul className={type}>
        <li>Description: {help}</li>
        <li>({name})</li>
        <li>Values: {values.value}</li> 
      </ul>
    </div>
  );
}

export default GaugeComponent;