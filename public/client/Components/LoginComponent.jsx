// import Button from '@'
// import { importNamespaceSpecifier } from '@babel/types';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function LoginComponent(props) {
  return (
    // <div>
    //   <p>Login Component Div</p>
    // </div>
    <Box 
      autoComplete="on"
    >
    <Stack spacing={3}>
      <TextField id="username" label="username" variant="outlined" />
      <TextField id="password" label="password" variant="outlined" />
    </Stack>
    <Stack direction="row">
      <Button variant="outlined">Sign In</Button>
      <Button color="primary" variant="outlined">Sign up</Button>
    </Stack>
    </Box>
  );
}