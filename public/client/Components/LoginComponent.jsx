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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // console.log('function user and pass', username, password)
  const submitForm = (e) => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password}),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('this is the res', res)
        if (res === true) {
          console.log('this is true res')
          //map dispatch action in here
          //dispatch action payload 
          //login reducer with logged in state
            //one dispatch function specified in action creators file
              //dispatched based on boolean to change state
            //in app.jsx map state to props to check boolean value of state to then render either cluster page 
            //or make cluster page

        }

        if (res === false) {
          () => {alert('please enter valid username and password')}
        }
      })
  }

  //are fields empty. send info as action creator. when get response then do action. action creator file. Boolean for signed in to do something.

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
            {/* helperText="Incorrect username or password" */}
          </form>
        </Stack>
        <Stack id="loginButtons" direction="row">
          <Button id="loginButtonIn" type="submit" form="user" variant="outlined" onClick={submitForm}>Sign In</Button>

          <Button id="loginButtonUp" color="neutral" variant="outlined" type="submit" onClick={submitForm}>Sign up</Button>
        </Stack>

 
      </Box>
    </div>
  );
}