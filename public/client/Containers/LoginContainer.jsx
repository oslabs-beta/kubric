import React from 'react';

function LoginContainer(props){
  return (
      <div id="login-container">
          <input placeholder="username"></input>
          <input placeholder="password"></input>
          <button className="primary-btn">Login</button>
          <button className="secondary-btn">Sign Up</button>
      </div>
  );
};

export default LoginContainer;