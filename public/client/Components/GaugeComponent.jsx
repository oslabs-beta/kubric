import React from 'react';

function GaugeComponent (props) {
  const { help, name, type, values, aggregator } = props.metric;

  // iterate through values array and create li items of each value and their labels 
  const getValues = (values) => {
    const valuesList = [];
    // console.log(values);
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
        labelsList
      }
      valuesList.push(<li><span>{value} </span><span>  | <i>{labelsList}</i></span></li>);
    })
    // console.log('valuesList', valuesList);
    if (!valuesList.length) {
      return 'none';
    }
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
        <li>Values: {getValues(values)}</li> 
      </ul>
    </div>
  );
}

export default GaugeComponent;