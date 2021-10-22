// import Button from '@'
// import { importNamespaceSpecifier } from '@babel/types';
import React from 'react';
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
  // const [username, password] = useState(props.user);

  const submitForm = (e) => {
    //name of endpoint pending
    fetch('/api/login', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json'
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({reqKey: 'string value'}),
    })
    .then((res) => res.json())
    //will instead be triggering the load to new page
    .then((res) => console.log('this res received', res))

  }

  //are fields empty. send info as action creator. when get response then do action. action creator file. Boolean for signed in to do something.
  //where are we storing the user and pw

  return (
    <div id="loginPage">
      <div>
        <h1>Kubric</h1>
      </div>
      {/* cursor: pointer */}

      <Box 
        sx={{
          '& > :not(style)': { m: 2, width: '35ch'}
        }}
        autoComplete="on"
      
      >

      <FormControl variant="standard" id="user">
        <InputLabel htmlFor="component-simple">Username</InputLabel>
        <Input id="component-simple" onChange={submitForm} />
      </FormControl>
      
      <Stack spacing={3}>
        <TextField id="username" label="username" variant="outlined" />
        <TextField id="password" label="password" variant="outlined" helperText="Incorrect username or password"/>
      </Stack>
      <Stack direction="row">
        <Button type="submit" form="user" style={{backgroundColor: "grey"}} variant="outlined" onClick={submitForm}>Sign In</Button>

        <Button color="neutral" variant="outlined" type="submit">Sign up</Button>
      </Stack>
 
      </Box>
    </div>
  );
}