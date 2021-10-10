import React from 'react';
import CounterComponent from './CounterComponent.jsx';
import GaugeComponent from './GaugeComponent.jsx';
import HistogramComponent from './HistorgramComponent.jsx';

function MetricsComponent (props) {
  const { metrics } = props;
  const metricsToRender = [];
  
  // iterate through received metrics
  metrics.forEach(metric => {
    
    // if type: counter, build a counter component and push to array
    if (metric.type === 'counter') {
      const counter = <CounterComponent metric={metric}/>
      metricsToRender.push(counter);
    }
    // if type: gauge, build a gauge component and push to array
    else if (metric.type === 'gauge') {
      const gauge = <GaugeComponent metric={metric}/>
      metricsToRender.push(gauge);
    }
    // if type: histogram, build a histogram component and push to array
    else if (metric.type === 'histogram') {
      const histogram = <HistogramComponent metric={metric}/>
      metricsToRender.push(histogram);
    }
  })

  // return dev containing the metrics array to the screen
  return (
    <div className="metricsComponent">
      {metricsToRender}
    </div>
  )
}

export default MetricsComponent;