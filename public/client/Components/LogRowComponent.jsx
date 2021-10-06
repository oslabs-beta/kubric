import React from 'react';

// TODOS: 
// what info/properties will we actually receive in K8S logs?
// should this info be rendered in divs and styled using grid-layout? or should they be rendered in some other way
function LogRowComponent(props){
  return (
    <div className="logRowComponent">
      <div className="logDate">{props.logDate}</div>
      <div className="logType">{props.logType}</div>
      <div className="podName">{props.podName}</div>
      <div className="logMessage">{props.logMessage}</div>
    </div>
  );
};

export default LogRowComponent;