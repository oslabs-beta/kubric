import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginContainer from './Containers/LoginContainer.jsx';
import LogContainer from './Containers/LogContainer.jsx';
import MetricsContainer from './Containers/MetricsContainer.jsx';
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Navigation from './Navigation/Navigation.jsx';
import Home from './Components/Home.jsx';
import {connect} from 'react-redux'

// TODO: Routing or logic to determine which containers to render at what points
// TODO: replace sampleData as property passed to MetricsComponent with a call to fetch default metrics via Prometheus
const mapStateToProps = (state) => {
  console.log('state in map state to props in app', state.loginReducer)

  return {
    appLogs: state.logsReducer.appLogs,
    validUser: state.loginReducer.validUser,
  };
};

export class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in app component', this.props)
  }

  render() {

    console.log('props in app component in render', this.props)
    if (this.props.validUser === false) {
      return (
        <div>
          <LoginContainer/>
        </div>
      )
    }
    if (this.props.validUser === true) {
      return (
        // <div>
        //   <CssBaseline />
        //   <Router>
        //     {/* <Navigation/> */}
        //     <Switch>
        //       <Route exact path="/" component={Home} />
        //       <Route exact path="/home" component={Home} />
        //       <Route exact path="/metrics" component={MetricsContainer} />
        //       <Route exact path="/logs" component={LogContainer} />
        //     </Switch>
        //   </Router>
        // </div>
        <div>
        <h1> Test render if true</h1>
      </div>
      )
    }
    
  }
}

//   if (props.validUser === true) {
//     return (
//       <div>
//         <CssBaseline />
//         <Router>
//           {/* <Navigation/> */}
//           <Switch>
//             <Route exact path="/" component={Home} />
//             <Route exact path="/home" component={Home} />
//             <Route exact path="/metrics" component={MetricsContainer} />
//             <Route exact path="/logs" component={LogContainer} />
//           </Switch>
//         </Router>
//       </div>
//     )
//   }
// }

export default connect(mapStateToProps, null)(App);
// export default App;

  // return (
  //   <div>
  //     <CssBaseline />
  //     <Router>
  //      {/* <Navigation/> */}
  //      <Switch>
  //           <Route exact path="/" component={LoginContainer} />
  //           <Route exact path="/home" component={Home} />
  //           <Route exact path="/metrics" component={MetricsContainer} />
  //           <Route exact path="/logs" component={LogContainer} />
  //     </Switch>
  //     </Router>
  //     </div>
  // )


