import React from 'react';
import LogRowComponent from '../Components/LogRowComponent.jsx'

// TODO: edit the buildLogRows helper function to pass in appropriate properties

function LogContainer(props){
  // array to hold log rows components to render
  const logsElement = [];

  // ASSUMPTION: logs will be an array of objects and be accessed through props???
  const logs = [
    {
      logDate: 1234,
      logType: 'ERROR',
      podName: 'somePodName',
      logMessage: `here\'s a(n) ERROR message from somePodName`
    },
    {
      logDate: 1235,
      logType: 'APPLICATION',
      podName: 'somePodName',
      logMessage: `here\'s a(n) APPLICATION message from somePodName`
    },
    {
      logDate: 1236,
      logType: 'ERROR',
      podName: 'someOtherPodName',
      logMessage: `here\'s a(n) ERROR message from someOtherPodName}`
    },
  ]
  
  // iterate through an array logs from DB and build an out an array of LogRowComponents to render them:
  logs.forEach((log => {
    // deconstruct necessary properties from each log 
    const { logDate, logType, podName, logMessage } = log;

    // generate a logRow component with properties specific to that log
    logsElement.push(<LogRowComponent key={logDate} logDate={logDate} logType={logType} podName={podName} logMessage={logMessage}/>)
  }))
    
  return (
    <div id="log-container">
      {logsElement}
    </div>
  );
};

export default LogContainer;