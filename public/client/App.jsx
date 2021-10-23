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

//map boolean login state to props here
// const mapStateToProps = (state) => {
//   return {
//     validUser: state.loginReducer.validUser,
//   }
// }

const mapStateToProps = (state) => {
  return {
    appLogs: state.logsReducer.appLogs,
    validUser: state.loginReducer.validUser,
  }
}



function App () {
  //if not valid user
  ///return...
  // <div>
  //   //<LoginContainer/>

  // </div>
  //if valid
  //return...
  <div>
  <CssBaseline />
  <Router>
   {/* <Navigation/> */}
   <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/metrics" component={MetricsContainer} />
        <Route exact path="/logs" component={LogContainer} />
  </Switch>
  </Router>
  </div>

  return (
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

