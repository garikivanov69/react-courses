import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateCourse from './components/CreateCourse/CreateCourse';
 
function App() {
  return (
    <Router>
      <div className="Container">
        <Header logoPath={logo} name="Dave" textButton="Logout"/>
        <Switch>
            <Route exact path="/" component={Courses} />
            <Route exact path="/create/course" component={CreateCourse} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
