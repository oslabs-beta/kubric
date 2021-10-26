import React from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
function Home() {
  return (
    <div>
      <Box id="appBarBox" sx={{ flexGrow: 1, backgroundColor: 'rgba(69,172,120,0.52)',borderRadius:4}}>
      <Paper variant="outlined" style={{display:'flex',justifyContent:'center',alignItems:'center',height:500}} elevation={3}>
      {/* <img style={{width:100,height:100}}
       src={require('../assets/cat.jpeg')}
       /> */}
        </Paper>
        </Box>
    </div>
  )
}
export default Home;
