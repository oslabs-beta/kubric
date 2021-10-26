import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import podsReducer from './reducers/podsReducer';
import servicesReducer from './reducers/servicesReducer';
import logsReducer from './reducers/logsReducer';
import nodesReducer from './reducers/nodesReducer';
import masterNodeReducer from './reducers/masterNodeReducer';
import loginReducer from './reducers/loginReducer';

const rootReducer = combineReducers({
  loginReducer,
  logsReducer,
  podsReducer,
  nodesReducer,
  servicesReducer,
  masterNodeReducer,
  // deploymentsReducer,
  // ingressesReducer,
  // metricsReducer,
  // ADD ANY NEW REDUCERS HERE
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;