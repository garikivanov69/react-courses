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
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createActionAddUser } from './store/user/actionCreators';


const selectUser = state => state.user;
 
function App() {
  let user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('courses-user'));
    if (user) {
      dispatch(createActionAddUser(user));
    }
  }, []);

  return (
    <Router>
      <div className="Container">
        <Header logoPath={logo} />
        <Switch>
            <Route exact path="/login" render={() => user.isAuth ? <Redirect to='/courses' /> : <Login />} />
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/courses/add" component={CreateCourse} />
            <Route exact path="/courses/:idCourse" component={CourseInfo} />
            <Route exact path="/registration" render={() => user.isAuth ? <Redirect to='/courses' /> : <Registration />} />
            <Route exact path="/404" component={SorryPage} />
            <Route render={() => user.isAuth ? <Redirect to='/courses' /> : <Redirect to='/login' />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
