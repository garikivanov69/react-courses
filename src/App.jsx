import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import CourseForm from './components/CourseForm/CourseForm';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import SorryPage from './components/SorryPage/SorryPage';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './store/selectors';
import { addCourseThunkWrapper, updateCourseThunkWrapper, getUserByTokenThunkWrapper } from './store/thunk';
import store from './store/index';


 
function App() {
  let user = useSelector(selectUser);

  useEffect(() => {
    let token = localStorage.getItem('courses-user');
    if (token) {
      store.dispatch(getUserByTokenThunkWrapper(token));
    }
  }, []);

  function createCourse (history, course) {
    store.dispatch(addCourseThunkWrapper(user.token, course, history));
  };

  function updateCourse(history, course, id) {
    store.dispatch(updateCourseThunkWrapper(user.token, id, course, history));
  };

  return (
    <Router>
      <div className="Container">
        <Header logoPath={logo} />
        <Switch>
            <Route exact path="/login" render={() => user.isAuth ? <Redirect to='/courses' /> : <Login />} />
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/courses/add" render={() => <CourseForm buttonText='Create course' submit={createCourse} />} />
            <Route exact path="/courses/:idCourse" component={CourseInfo} />
            <Route exact path="/courses/update/:idCourse" render={() => <CourseForm buttonText='Update course' submit={updateCourse} />} />
            <Route exact path="/registration" render={() => user.isAuth ? <Redirect to='/courses' /> : <Registration />} />
            <Route exact path="/404" component={SorryPage} />
            <Route render={() => user.isAuth ? <Redirect to='/courses' /> : <Redirect to='/login' />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
