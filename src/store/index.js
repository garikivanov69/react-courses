import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import coursesReducer from './courses/reducer.js';
import authorsReducer from './authors/reducer.js';
import userReducer from './user/reducer.js';
import thunkMiddleware from 'redux-thunk';
import { save, load } from "redux-localstorage-simple";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = {user: userReducer, courses: coursesReducer, authors: authorsReducer};

const rootReducer = combineReducers(reducers);

const store = createStore(rootReducer, load(), composeEnhancers(applyMiddleware(thunkMiddleware), applyMiddleware(save())));

export default store; 