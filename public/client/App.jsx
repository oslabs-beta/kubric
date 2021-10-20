import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginContainer from './Containers/LoginContainer.jsx';
import QueryContainer from './Containers/QueryContainer.jsx';
import LogContainer from './Containers/LogContainer.jsx';
import ConfigContainer from './Containers/ConfigContainer.jsx';
import PodsContainer from './Containers/PodsContainer.jsx';
import MetricsComponent from './Components/MetricsComponent.jsx';
import MetricsContainer from './Containers/MetricsContainer.jsx';
import { DataGrid } from '@mui/x-data-grid';
import CssBaseline from '@mui/material/CssBaseline'
import { makeStyles } from '@mui/styles';
import { Link } from '@mui/material';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Navigation from './Navigation/Navigation.jsx';
import Home from './Components/Home.jsx';
const rows = [
  { id: 1, align:"left", col1: 'Hello', col2: 'World' },
  { id: 2, align:"left", col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, align:"left", col1: 'MUI', col2: 'is Amazing' },
  { id: 4, align:"left", col1: 'MrI', col2: 'is mazing' },
]

const columns = [
  { field: 'col1', align:"left", headerName: 'Column 1', width: 200 },
  { field: 'col2', align:"left", headerName: 'Column 2', width: 200 },
];


const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 480, 
    width: '100%', 
    borderRadius: 10,
    padding: '0 30px',
  },
    footerContainer: {
    height: "10px !important",
    background: "red",
  }
});


// TODO: Routing or logic to determine which containers to render at what points
// TODO: replace sampleData as property passed to MetricsComponent with a call to fetch default metrics via Prometheus

const sampleData = JSON.parse('[{"help":"Total user CPU time spent in seconds.","name":"process_cpu_user_seconds_total","type":"counter","values":[{"value":0.154021,"labels":{}}],"aggregator":"sum"},{"help":"Total system CPU time spent in seconds.","name":"process_cpu_system_seconds_total","type":"counter","values":[{"value":0.045244,"labels":{}}],"aggregator":"sum"},{"help":"Total user and system CPU time spent in seconds.","name":"process_cpu_seconds_total","type":"counter","values":[{"value":0.199265,"labels":{}}],"aggregator":"sum"},{"help":"Start time of the process since unix epoch in seconds.","name":"process_start_time_seconds","type":"gauge","values":[{"value":1633816140,"labels":{}}],"aggregator":"omit"},{"help":"Resident memory size in bytes.","name":"process_resident_memory_bytes","type":"gauge","values":[{"value":89731072,"labels":{}}],"aggregator":"sum"},{"help":"Lag of event loop in seconds.","name":"nodejs_eventloop_lag_seconds","type":"gauge","values":[{"value":0,"labels":{}}],"aggregator":"average"},{"help":"The minimum recorded event loop delay.","name":"nodejs_eventloop_lag_min_seconds","type":"gauge","values":[{"value":0.009125888,"labels":{}}],"aggregator":"sum"},{"help":"The maximum recorded event loop delay.","name":"nodejs_eventloop_lag_max_seconds","type":"gauge","values":[{"value":0.059113471,"labels":{}}],"aggregator":"sum"},{"help":"The mean of the recorded event loop delays.","name":"nodejs_eventloop_lag_mean_seconds","type":"gauge","values":[{"value":0.011586596121410992,"labels":{}}],"aggregator":"sum"},{"help":"The standard deviation of the recorded event loop delays.","name":"nodejs_eventloop_lag_stddev_seconds","type":"gauge","values":[{"value":0.0029442740673764124,"labels":{}}],"aggregator":"sum"},{"help":"The 50th percentile of the recorded event loop delays.","name":"nodejs_eventloop_lag_p50_seconds","type":"gauge","values":[{"value":0.011132927,"labels":{}}],"aggregator":"sum"},{"help":"The 90th percentile of the recorded event loop delays.","name":"nodejs_eventloop_lag_p90_seconds","type":"gauge","values":[{"value":0.012689407,"labels":{}}],"aggregator":"sum"},{"help":"The 99th percentile of the recorded event loop delays.","name":"nodejs_eventloop_lag_p99_seconds","type":"gauge","values":[{"value":0.020561919,"labels":{}}],"aggregator":"sum"},{"help":"Number of active libuv handles grouped by handle type. Every handle type is C++ class name.","name":"nodejs_active_handles","type":"gauge","values":[{"value":1,"labels":{"type":"Pipe"}},{"value":4,"labels":{"type":"Socket"}},{"value":1,"labels":{"type":"Server"}}],"aggregator":"sum"},{"help":"Total number of active handles.","name":"nodejs_active_handles_total","type":"gauge","values":[{"value":6,"labels":{}}],"aggregator":"sum"},{"help":"Number of active libuv requests grouped by request type. Every request type is C++ class name.","name":"nodejs_active_requests","type":"gauge","values":[],"aggregator":"sum"},{"help":"Total number of active requests.","name":"nodejs_active_requests_total","type":"gauge","values":[{"value":0,"labels":{}}],"aggregator":"sum"},{"help":"Process heap size from Node.js in bytes.","name":"nodejs_heap_size_total_bytes","type":"gauge","values":[{"value":61960192,"labels":{}}],"aggregator":"sum"},{"help":"Process heap size used from Node.js in bytes.","name":"nodejs_heap_size_used_bytes","type":"gauge","values":[{"value":35500096,"labels":{}}],"aggregator":"sum"},{"help":"Node.js external memory size in bytes.","name":"nodejs_external_memory_bytes","type":"gauge","values":[{"value":7066419,"labels":{}}],"aggregator":"sum"},{"help":"Process heap space size total from Node.js in bytes.","name":"nodejs_heap_space_size_total_bytes","type":"gauge","values":[{"value":151552,"labels":{"space":"read_only"}},{"value":33554432,"labels":{"space":"new"}},{"value":21127168,"labels":{"space":"old"}},{"value":360448,"labels":{"space":"code"}},{"value":1576960,"labels":{"space":"map"}},{"value":5140480,"labels":{"space":"large_object"}},{"value":49152,"labels":{"space":"code_large_object"}},{"value":0,"labels":{"space":"new_large_object"}}],"aggregator":"sum"},{"help":"Process heap space size used from Node.js in bytes.","name":"nodejs_heap_space_size_used_bytes","type":"gauge","values":[{"value":150392,"labels":{"space":"read_only"}},{"value":7572440,"labels":{"space":"new"}},{"value":20986560,"labels":{"space":"old"}},{"value":249344,"labels":{"space":"code"}},{"value":1452528,"labels":{"space":"map"}},{"value":5093896,"labels":{"space":"large_object"}},{"value":2880,"labels":{"space":"code_large_object"}},{"value":0,"labels":{"space":"new_large_object"}}],"aggregator":"sum"},{"help":"Process heap space size available from Node.js in bytes.","name":"nodejs_heap_space_size_available_bytes","type":"gauge","values":[{"value":0,"labels":{"space":"read_only"}},{"value":9186344,"labels":{"space":"new"}},{"value":44176,"labels":{"space":"old"}},{"value":6272,"labels":{"space":"code"}},{"value":0,"labels":{"space":"map"}},{"value":0,"labels":{"space":"large_object"}},{"value":0,"labels":{"space":"code_large_object"}},{"value":16758784,"labels":{"space":"new_large_object"}}],"aggregator":"sum"},{"help":"Node.js version info.","name":"nodejs_version_info","type":"gauge","values":[{"value":1,"labels":{"version":"v14.17.5","major":14,"minor":17,"patch":5}}],"aggregator":"first"},{"name":"nodejs_gc_duration_seconds","help":"Garbage collection duration by kind, one of major, minor, incremental or weakcb.","type":"histogram","values":[],"aggregator":"sum"}]');

function App () {
  //const [user, setUser] = useState('')
  const classes = useStyles();

  return (
    
    <div>
      <CssBaseline />
      <Router>
       <Navigation/>
       <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/metrics" component={MetricsContainer} />
            <Route exact path="/logs" component={LogContainer} />
      </Switch>
       
      </Router>
        <div style={{height: 480, width: '100%', borderRadius:10}}> 
      <DataGrid classes={{
        footerContainer : classes.footerContainer,
        root: classes.root
      }}rowHeight={60}  rows={rows} columns={columns} />
     </div> 
      <div>
        Pods
        <PodsContainer/>
      </div>
      <div>
        Pod Metrics
        <MetricsContainer/>
      </div>
      {/* <div>
        Query Logs
        <QueryContainer/>
      </div> */}
      <div>
        <LogContainer/>
      </div>
      </div>
  )
};

export default App;

