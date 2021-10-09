import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
  
  // ADD ANY NEW REDUCERS HERE
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;