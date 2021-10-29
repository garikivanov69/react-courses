import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import SorryPage from './components/SorryPage/SorryPage';
import React, { useState } from 'react';
 
function App() {
  const [userToken, setUserToken] = useState(localStorage.getItem('courses-user-token'));

  return (
    <Router>
      <div className="Container">
        <Header logoPath={logo} setUserToken={setUserToken} userToken={userToken}/>
        <Switch>
            <Route exact path="/login" render={() => userToken ? <Redirect to='/courses' /> : <Login setUserToken={setUserToken} userToken={userToken} />} />
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/courses/add" component={CreateCourse} />
            <Route exact path="/courses/:idCourse" component={CourseInfo} />
            <Route exact path="/registration" render={() => userToken ? <Redirect to='/courses' /> : <Registration />} />
            <Route exact path="/404" component={SorryPage} />
            <Route render={() => userToken ? <Redirect to='/courses' /> : <Redirect to='/login' />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
