import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/metricsActionCreators.js';
import NodeXContainer from './NodeXContainer.jsx';
import NodeChartContainer from './NodeChartContainer.jsx';
import PodChartContainer from './PodChartContainer.jsx';
import PodsContainer from './PodsContainer.jsx';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const mapDispatchToProps = dispatch => {
  return {
    fetchDefaultMetrics: () => dispatch(actions.fetchDefaultMetrics()),
  }
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
      id={`cluster-tabpanel-${index}`}
      aria-labelledby={`cluster-tab-${index}`}
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
    id: `cluster-tab-${index}`,
    'aria-controls': `cluster-tabpanel-${index}`,
  };
}
// TODO: what props are needed from state here?

function MetricsContainer(props) {
  const containerClasses = useStyles();
  const tabClasses = tabStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    props.fetchDefaultMetrics();
  });
  
    // return dev containing the metrics array to the screen
    console.log('metrics container rendered')
    return (
      <div style={{display: 'flex'}}> 
       <Container id="metricsContainer"
       classes={{
        root: containerClasses.root
      }} >
         <Box sx={{ borderBottom: 1, borderColor: 'divider'} }>
        <Tabs classes={{scroller:tabClasses.scroller,flexContainer:tabClasses.flexContainer}} value={value} onChange={handleChange} aria-label="cluster node tabs">
          <Tab label="Overview" {...addProps(0)} />
          <Tab label="Master" {...addProps(1)} />
          <Tab label="Worker Node 1" {...addProps(2)} />
          <Tab label="Worker Node 2" {...addProps(3)} />
          <Tab label="Worker Node 3" {...addProps(4)} />
        </Tabs>
        </Box>
        <Box sx={{ display:"flex", 
        flexDirection:"row",
        justifyContent:'space-evenly'} }>
        <TabPanel value={value} index={0}> 
        <NodeChartContainer/>
        <NodeXContainer/>
        </TabPanel>

        <TabPanel value={value} index={1}> 
         Master Node
         </TabPanel>

        <TabPanel value={value} index={2}>
        <PodChartContainer/>
        <PodsContainer/>
        </TabPanel>

        <TabPanel value={value} index={3}>
        <PodChartContainer/>
        <PodsContainer/>
        </TabPanel>

        <TabPanel value={value} index={4}>
        <PodChartContainer/>
        <PodsContainer/>
        </TabPanel>
        </Box>
        </Container>
      </div>
    )
  
}


export default connect(null, mapDispatchToProps)(MetricsContainer);