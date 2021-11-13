import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import coursesReducer from './courses/reducer.js';
import authorsReducer from './authors/reducer.js';
import userReducer from './user/reducer.js';
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = {user: userReducer, courses: coursesReducer, authors: authorsReducer};

const rootReducer = combineReducers(reducers);

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store; 