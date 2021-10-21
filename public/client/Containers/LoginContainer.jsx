import React from 'react';
import LoginComponent from '../Components/LoginComponent.jsx';

function LoginContainer(props){
  return (
    <div id="login-container">
      {/* <input placeholder="username"></input>
      <input placeholder="password"></input>
      <button className="primary-btn">Login</button>
      <button className="secondary-btn">Sign Up</button> */}
      <LoginComponent/>
    </div>
  );
}

export default LoginContainer;