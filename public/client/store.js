import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import podsReducer from './reducers/podsReducer.js';
import servicesReducer from './reducers/servicesReducer.js';


const rootReducer = combineReducers({
  // deploymentsReducer,
  // ingressesReducer,
  // metricsReducer,
  // nodesReducer,
  podsReducer,
  servicesReducer,
  // ADD ANY NEW REDUCERS HERE
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;