import React, { useState, useEffect } from 'react';
import LoginContainer from './Containers/LoginContainer.jsx';

function App () {
  //const [user, setUser] = useState('')
  
  return (
    <div>
        hello
        <LoginContainer/>
    </div>
  )
};

// "start": "nodemon server/server.js",
// "build": "NODE_ENV=production webpack & NODE_ENV=production npm run start",
// "dev": "NODE_ENV=development webpack serve --open & NODE_ENV=development npm run start",

export default App;