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
  );
}

export default LoginContainer;