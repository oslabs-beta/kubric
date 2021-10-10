import React from 'react';

const sampleCounterObj = {
  help: "Total user CPU time spent in seconds.",
  name: "process_cpu_user_seconds_total",
  type: "counter",
  values: [{
    value:0.154021,
    labels:{}
  }],
  aggregator: "sum"
}

function CounterComponent (props) {
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
    <div className="counterComponent">
      <ul className={type}>
        <li>Description: {help}</li>
        <li>({name})</li>
        <li>Values: {getValues(values)}</li> 
      </ul>
    </div>
  );
}

export default CounterComponent;