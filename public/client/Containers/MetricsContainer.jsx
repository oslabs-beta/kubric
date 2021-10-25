import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/metricsActionCreators.js';
import NodeXContainer from './NodeXContainer.jsx';
import NodeChartContainer from './NodeChartContainer.jsx';
import PodChartContainer from './PodChartContainer.jsx';
import PodsContainer from './PodsContainer.jsx';
import MasterNodeContainer from './MasterNodeContainer.jsx';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';

const mapStateToProps = state => {
  return {
    nodes: state.nodesReducer.nodes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // fetchDefaultMetrics: () => dispatch(actions.fetchDefaultMetrics()),
    fetchNodeMetrics: () => dispatch(actions.fetchNodeMetrics()),
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
    // props.fetchDefaultMetrics();
    props.fetchNodeMetrics();
  }, []);

  // console.log('nodes from props', props.nodes);
  const tabPanels = [];
  const tabs = [];
  let tabNum = 2;
  for (let node in props.nodes) {
    console.log('inside loop', props.nodes[node]);
    // add a Tab to tabs array
    tabs.push(<Tab label={`Worker Node ${tabNum-1}`} {...addProps(tabNum)}/>);
    // add a TabPanel to tabPanels
    tabPanels.push(
      <TabPanel 
        value={value} 
        index={tabNum}
      >
          <PodsContainer nodeName={node} />
          <PodChartContainer />
      </TabPanel>);
    tabNum += 1;
  }

  
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
            {tabs}
          </Tabs>
        </Box>
        <Box sx={{ display:"flex", 
          flexDirection:"row",
          justifyContent:'space-evenly',
          marginLeft: "8vh",
          marginRight: "8vh"
          }}>
          <TabPanel value={value} index={0}> 
            <NodeXContainer/>
            <NodeChartContainer/>
          </TabPanel>
          
          <TabPanel value={value} index={1}> 
            <MasterNodeContainer/>
          </TabPanel>

          {/* Tab Panel for each node */}
          {tabPanels}
        </Box>
        </Container>
      </div>
    )
  
}


export default connect(mapStateToProps, mapDispatchToProps)(MetricsContainer);