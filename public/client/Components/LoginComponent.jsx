// import Button from '@'
// import { importNamespaceSpecifier } from '@babel/types';
import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import * as actions from '../actions/clusterActionCreators.js';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    renderCluster: (boolean) => {dispatch(actions.renderCluster(boolean))}
  };
};

function LoginComponent(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const submitFormLogin = (e) => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password}),
    })
      .then((res) => res.json())
      .then((res) => {
        props.renderCluster(res)
        if (res === false) {
          alert('Username or password not found');
        }
      })
  }

  const submitFormSignUp = (e) => {
    fetch('/api/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password}),
    })
      .then((res) => res.json())
      .then((res) => {
        props.renderCluster(res);
      });
  };

  return (
    <div id="loginPage">
      <div id="loginLogo">
        <h1>Kubric</h1>
      </div>

      <Box 
        sx={{
          '& > :not(style)': { m: 2, width: '35ch'}
        }}
      >
      
        <Stack spacing={6}>
          <form action="/Api/login" method="POST">
            <TextField id="username" autoComplete="on" label="username" onChange={(e) => setUsername(e.target.value)} variant="outlined" required/>
            <TextField id="password" label="password" type="password" name="password" onChange={(e) => setPassword(e.target.value)} variant="outlined" required/>
          </form>
        </Stack>
        <Stack id="loginButtons" direction="row">
          <Button id="loginButtonIn" type="submit" form="user" variant="outlined" onClick={submitFormLogin}>Sign In</Button>
          <Button id="loginButtonUp" color="neutral" variant="outlined" type="submit" onClick={submitFormSignUp}>Sign up</Button>
        </Stack>
      </Box>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(LoginComponent);