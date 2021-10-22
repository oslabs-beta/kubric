import React from 'react';
import LoginComponent from '../Components/LoginComponent.jsx';
import Grid from '@mui/material/Grid';


function LoginContainer(props){
  return (

<Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '100vh' }}
>

  <Grid item xs={3}>
   <LoginComponent />
  </Grid>   
   
</Grid> 

    // <div id="loginContainer">
    //   {/* <input placeholder="username"></input>
    //   <input placeholder="password"></input>
    //   <button className="primary-btn">Login</button>
    //   <button className="secondary-btn">Sign Up</button> */}
    //   <LoginComponent/>
    // </div>
  );
}

export default LoginContainer;