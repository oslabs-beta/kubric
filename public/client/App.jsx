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
    
    // <div>
    //   Kubric
    //   {/* <div>
    //     Login Container:
    //     <LoginContainer/>
    //   </div>
    //   <div>
    //     Configuration Container:
    //     <ConfigContainer/>
    //   </div> */}
    //   <div>
    //     Pods
    //     {/* <PodsContainer/> */}
    //   </div>
    //   <div>
    //     Pod Metrics
    //     <MetricsContainer/>
    //   </div>
    //   <div>
    //     Query Logs
    //     {/* <QueryContainer/> */}
    //   </div>
    //   <div>
    //     Log Container
    //     <LogContainer/>
    //   </div>
    //   <div>
    //     Login Container
    //     <LoginContainer/>
    //   </div>
     
    <div>
      <CssBaseline />
      <Router>
       {/* <Navigation/> */}
       <Switch>
            <Route exact path="/" component={LoginContainer} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/metrics" component={MetricsContainer} />
            <Route exact path="/logs" component={LogContainer} />
      </Switch>
      </Router>
      </div>
  )
}

export default App;

