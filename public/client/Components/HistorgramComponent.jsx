import React from 'react';

const sampleHistogramObj = {
  name:"nodejs_gc_duration_seconds",
  help:"Garbage collection duration by kind, one of major, minor, incremental or weakcb.",
  type:"histogram",
  values:[],
  aggregator:"sum"
};

function HistogramComponent (props) {
  const { help, name, type, values, aggregator } = props.metric;

  return (
    <div className="histogramComponent">
      <ul className={type}>
        <li>Description: {help}</li>
        <li>({name})</li>
        <li>Values: {values}</li> 
      </ul>
    </div>
  );
}

export default HistogramComponent;