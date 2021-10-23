import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import LogRowComponent from '../Components/LogRowComponent.jsx'
import * as actions from '../actions/logsActionCreator.js';
import PersistQueryContainer from './PersistQueryContainer.jsx';
import LiveQueryContainer from './LiveQueryContainer.jsx';
import Button from '@mui/material/Button'
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// TODO: edit the buildLogRows helper function to pass in appropriate properties

const tabStyles = makeStyles({
  flexContainer:{
    width:"100%",
    display:"flex", 
    flexDirection:"row",
    justifyContent:'space-evenly'
  },
  scroller:{
    width:"100%",
    display:"flex", 
    flexDirection:"row",
    justifyContent:'space-evenly'
  }
})
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`log-tabpanel-${index}`}
      aria-labelledby={`log-tab-${index}`}
      {...other}
      style={{width:'100%',height:'100%',margin:'0',padding:'0'}}
    >
      {value === index && (
        <Box >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function addProps(index) {
  return {
    id: `log-tab-${index}`,
    'aria-controls': `log-tabpanel-${index}`,
  };
}
const useStyles = makeStyles({
  root:{
    background: 'rgba(69,172,120,0.52)',
    border: 0,
    borderRadius: 4,
    boxShadow: '6px 2px 3px -1px rgba(0,0,0,0.75)',
    color: 'white', 
    padding: '30px 30px 30px 30px',
  },
})

const LogContainer = (props) => {
  const containerClasses = useStyles();
  const tabClasses = tabStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
   
  
  return(
    <div style={{display: 'flex'}}> 
    <Container id="logContainer"
       classes={{
        root: containerClasses.root
      }} >
         <Box sx={{ borderBottom: 1, borderColor: 'divider'} }>
          <Tabs classes={{scroller:tabClasses.scroller,
            flexContainer:tabClasses.flexContainer}} 
            value={value} onChange={handleChange} 
            aria-label="cluster log tabs">
            <Tab label="Persistent" {...addProps(0)} />
            <Tab label="Live" {...addProps(1)} />
          </Tabs>
        </Box>

        <Box sx={{ display:"flex", 
          flexDirection:"row",
          justifyContent:'space-evenly'} }>
          <TabPanel value={value} index={0}> 
          <PersistQueryContainer />
          </TabPanel>
          <TabPanel value={value} index={1}> 
          <LiveQueryContainer />
          </TabPanel>
        </Box>
      
    
    </Container>
    </div>
  )

};

export default LogContainer;