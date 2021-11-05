import { createStore, combineReducers, applyMiddleware  } from 'redux';
import coursesReducer from './courses/reducer.js';
import authorsReducer from './authors/reducer.js';
import userReducer from './user/reducer.js';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const reducers = {user: userReducer, courses: coursesReducer, authors: authorsReducer};

const rootReducer = combineReducers(reducers);

const store = createStore(rootReducer, composedEnhancer);

export default store; 