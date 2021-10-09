import React from 'react';

function QueryContainer(props){
  return (
      <div id="query-container">
          <input className="query-string-input query-parameter" placeholder="query logs"></input>
          <button className="primary-btn" id="submitQuery">Submit Query</button>
          <button className="secondary-btn" id="resetQuery">Reset Query</button>
          {/* filter menu component */}
      </div>
  );
};

export default QueryContainer;