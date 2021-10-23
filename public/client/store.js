import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import podsReducer from './reducers/podsReducer';
import servicesReducer from './reducers/servicesReducer';
import metricsReducer from './reducers/metricsReducer';
import logsReducer from './reducers/logsReducer';
import nodesReducer from './reducers/nodesReducer';
import loginReducer from './reducers/loginReducer';

const rootReducer = combineReducers({
  // deploymentsReducer,
  // ingressesReducer,
  metricsReducer,
  logsReducer,
  podsReducer,
  nodesReducer,
  servicesReducer,
  loginReducer,
  // ADD ANY NEW REDUCERS HERE
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;