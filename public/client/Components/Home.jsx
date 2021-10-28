import React from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import kubricLogo from '../assets/kubric.png'
function Home() {
  return (
    <div id="backgroundContainer">
      <Box id="backgroundBox" sx={{ flexGrow: 1, backgroundColor: 'rgba(69,172,120,0.52)',borderRadius:4}}>
      <Paper variant="outlined" style={{display:'flex',justifyContent:'center',alignItems:'stretch',height:500}} elevation={3}>
      <img src={kubricLogo}/>
        </Paper>
        </Box>
    </div>
  )
}
export default Home;
