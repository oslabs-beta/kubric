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


export default function LoginComponent(props) {
  //action creator then
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  console.log('function user and pass', username, password)
  const submitForm = (e) => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json'
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({'username': username, 'password': password}),
    })
    .then((res) => res.json())
    .then((res) => console.log('this res received', res))

  }

  //are fields empty. send info as action creator. when get response then do action. action creator file. Boolean for signed in to do something.

  return (

    <div id="loginPage">
      <div id="loginLogo">
        <h1>Kubric</h1>
      </div>
      {/* cursor: pointer */}

      <Box 
        sx={{
          '& > :not(style)': { m: 2, width: '35ch'}
        }}
      >
      
        <Stack spacing={6}>
          <form action="/Api/login" method="POST">
            <TextField id="username" autoComplete="on" label="username" onChange={(e) => {setUsername(e.target.value)}} variant="outlined" />
            <TextField id="password" label="password" onChange={(e) => {setPassword(e.target.value)}} variant="outlined" />
            {/* helperText="Incorrect username or password" */}
          </form>
        </Stack>
        <Stack id="loginButtons" direction="row">
          <Button id="loginButtonIn" type="submit" form="user" variant="outlined" onClick={submitForm}>Sign In</Button>

          <Button id="loginButtonUp" color="neutral" variant="outlined" type="submit">Sign up</Button>
        </Stack>

 
      </Box>
    </div>
  );
}