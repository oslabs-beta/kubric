import React, { useState, useEffect } from 'react';
import LoginContainer from './Containers/LoginContainer.jsx';
import QueryContainer from './Containers/QueryContainer.jsx';
import LogContainer from './Containers/LogContainer.jsx';
import ConfigContainer from './Containers/ConfigContainer.jsx';
import PodsContainer from './Containers/PodsContainer.jsx';


// TODO: Routing or logic to determine which containers to render at what points

function App () {
  //const [user, setUser] = useState('')
  
  return (
    <div>
      Kubric
      <div>
        Login Container:
        <LoginContainer/>
      </div>
      <div>
        Configuration Container:
        <ConfigContainer/>
      </div>
      <div>
        Pods Conatiner:
        <PodsContainer/>
      </div>
      <div>
        Query Container:
        <QueryContainer/>
      </div>
      <div>
        Log Container:
        <LogContainer/>
      </div>
    </div>
  )
};

// "start": "nodemon server/server.js",
// "build": "NODE_ENV=production webpack & NODE_ENV=production npm run start",
// "dev": "NODE_ENV=development webpack serve --open & NODE_ENV=development npm run start",

export default App;