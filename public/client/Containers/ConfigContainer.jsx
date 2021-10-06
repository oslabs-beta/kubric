import React from 'react';

function ConfigContainer(props){
  return (
      <div id="config-container">
          <div id="k8s-connection">
            <input className="input config-input" placeholder="Kubernetes connection string"></input>
            <button className="primary-btn">Connect Cluster</button>
          </div>
          <div id="db-connection">
            <input className="input config-input" placeholder="Databse URI for log persistence"></input>
            <button className="secondary-btn">Connect DB</button>
          </div>
          <div id="config-interval">
            {/* should this be a drop down menu instead? */}
            <input className="input config-input" placeholder="enter time in ms"></input>
            <button className="secondary-btn">Set Interval</button>
          </div>
      </div>
  );
};

export default ConfigContainer;