import React, {useState, useEffect} from 'react';
import CourseCard from '../CourseCard/CourseCard';
import Search from '../Search/Search';
import './Courses.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import {useFormattingTimeFromMins} from '../../courseUtils.js'
import { useSelector } from 'react-redux';
import { fetchCourses, fetchAuthors } from '../../store/servises';
import store from '../../store/index';
import { selectCourses, selectAuthors, selectUser } from '../../store/selectors';
import { getUserRoleThunkWrapper } from '../../store/thunk';



function Courses() {
    let courses = useSelector(selectCourses);
    let authors = useSelector(selectAuthors);
    let user = useSelector(selectUser);
    const [arrayOfCourses, setArrayOfCourses] = useState(courses.slice());
    const [searchKey, setSearchKey] = useState('');
    const getTimeFromMins = useFormattingTimeFromMins();

    useEffect(() => {
        store.dispatch(fetchCourses);
        store.dispatch(fetchAuthors);
        if (user.token) {
            store.dispatch(getUserRoleThunkWrapper(user.token));
        }
    }, []);

    let getAuthors = function (course) {
        let res = '';
        for (let i = 0; i < course.authors.length; i++) {
            for (let j = 0; j < authors.length; j++) {
                if (course.authors[i] === authors[j].id) {
                    res += authors[j].name + ', ';
                    break;
                }
            }
        }
        return res.replace(/,\s*$/, "");
    };

    return ( 
        <div>
            <div className="Courses-search-container">
                <Search searchKey={searchKey} setSearchKey={setSearchKey} />
                {user.role === 'admin' ? <Link to="/courses/add" ><Button text="Create course" /></Link> : ''}
            </div>
            <div>
                <ul className="Courses">
                    {courses.map((course) => 
                        {
                            if (course.title.toLowerCase().includes(searchKey.toLowerCase()) || course.id === searchKey) {
                                return (<li key={course.id}>
                                    <CourseCard id={course.id} title={course.title} description={course.description} duration={getTimeFromMins(course.duration)} creationDate={course.creationDate} authors={getAuthors(course)} setCourses={setArrayOfCourses} courses={arrayOfCourses} />
                                </li>)
                            } else {
                                return ('');
                            }
                        })
                    }
                </ul>
            </div>
        </div>
     );
}

export default Courses;