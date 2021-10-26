import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginContainer from './Containers/LoginContainer.jsx';
import LogContainer from './Containers/LogContainer.jsx';
import MetricsContainer from './Containers/MetricsContainer.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Navigation from './Navigation/Navigation.jsx';
import Home from './Components/Home.jsx';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    appLogs: state.logsReducer.appLogs,
    validUser: state.loginReducer.validUser,
  };
};

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.validUser === false) {
      return (
        <div>
          <LoginContainer/>
        </div>
      );
    }
    if (this.props.validUser === true) {
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
    }
  }
}

export default connect(mapStateToProps, null)(App);



