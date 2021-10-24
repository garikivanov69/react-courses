import React, {useState, useContext} from 'react';
import CourseCard from '../CourseCard/CourseCard';
import Search from '../Search/Search';
import './Courses.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import{CoursesContext} from '../../index.js';


function Courses(props) {
    const repository = useContext(CoursesContext);
    const [arrayOfCourses, setArrayOfCourses] = useState(repository.mockedCoursesList);


    let getAuthors = function (course) {
        let res = '';
        for (let i = 0; i < course.authors.length; i++) {
            for (let j = 0; j < repository.mockedAuthorsList.length; j++) {
                if (course.authors[i] === repository.mockedAuthorsList[j].id) {
                    res += repository.mockedAuthorsList[j].name + ', ';
                    break;
                }
            }
        }
        return res.replace(/,\s*$/, "");;
    };

    let getTimeFromMins = function (mins) {
        let hours = Math.trunc(mins/60);
        let minutes = mins % 60;
        return hours + ':' + minutes + ' hours';
    };



    return ( 
        <div>
            <div className="Courses-search-container">
                <Search setSearchResult={setArrayOfCourses} dataList={repository.mockedCoursesList}/>
                <Link to="/create/course" ><Button text="Create course" /></Link>
            </div>
            <div>
                <ul className="Courses">
                    {arrayOfCourses.map((course) => 
                        <li key={course.id}>
                            <CourseCard title={course.title} description={course.description} duration={getTimeFromMins(course.duration)} creationDate={course.creationDate} authors={getAuthors(course)} />
                        </li>)}
                </ul>
            </div>
        </div>
     );
}


export default Courses;