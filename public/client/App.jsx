import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginContainer from './Containers/LoginContainer.jsx';
import LogContainer from './Containers/LogContainer.jsx';
import MetricsContainer from './Containers/MetricsContainer.jsx';
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Navigation from './Navigation/Navigation.jsx';
import Home from './Components/Home.jsx';



// TODO: Routing or logic to determine which containers to render at what points
// TODO: replace sampleData as property passed to MetricsComponent with a call to fetch default metrics via Prometheus

function App () {
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
      </div>
  )
};
//import { DataGrid } from '@mui/x-data-grid';
//import { makeStyles } from '@mui/styles';
// const rows = [
//   { id: 1, align:"left", col1: 'Hello', col2: 'World' },
//   { id: 2, align:"left", col1: 'DataGridPro', col2: 'is Awesome' },
//   { id: 3, align:"left", col1: 'MUI', col2: 'is Amazing' },
//   { id: 4, align:"left", col1: 'MrI', col2: 'is mazing' },
// ]

// const columns = [
//   { field: 'col1', align:"left", headerName: 'Column 1', width: 200 },
//   { field: 'col2', align:"left", headerName: 'Column 2', width: 200 },
// ];
// const useStyles = makeStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 480, 
//     width: '100%', 
//     borderRadius: 10,
//     padding: '0 30px',
//   },
//     footerContainer: {
//     height: "10px !important",
//     background: "red",
//   }
// });
//const classes = useStyles();
{/* <div style={{height: 480, width: '100%', borderRadius:10}}> 
      <DataGrid classes={{
        footerContainer : classes.footerContainer,
        root: classes.root
      }}rowHeight={60}  rows={rows} columns={columns} />
     </div>  */}
export default App;

