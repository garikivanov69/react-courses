import React from 'react';
import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import './CourseInfo.css';
import {useFormattingTimeFromMins} from '../../courseUtils.js';
import { useSelector } from 'react-redux';

const selectCourses = state => state.courses;
const selectAuthors = state => state.authors;


function CourseInfo(props) {
    let courses = useSelector(selectCourses);
    let authorsRepository = useSelector(selectAuthors);
    const [course, setCourse] = useState({});
    const [authors, setAuthors] = useState([]);
    let { idCourse } = useParams();
    let history = useHistory();
    const getTimeFromMins = useFormattingTimeFromMins();


    let getAuthors = function (course) {
        let res = [];
        for (let i = 0; i < course.authors.length; i++) {
            for (let j = 0; j < authorsRepository.length; j++) {
                if (course.authors[i] === authorsRepository[j].id) {
                    res.push(authorsRepository[j]);
                    break;
                }
            }
        }
        return res;
    };
    
    useEffect(() => {
        let courseInfo = courses.find((element, index, arr) => element.id === idCourse);
        if (courseInfo) {
            setCourse(courseInfo);
            setAuthors(getAuthors(courseInfo));
        } else {
            history.push('/404');
        }
    }, []);

    return ( 
        <div className="CourseInfo">
            <Link to="/courses" ><Button text="Back to courses" /></Link>
            <h1>{course.title}</h1>
            <div className="flex-container">
                <div className="course-description">
                    <p>{course.description}</p>
                </div>
                <div className="course-addition-info">
                    <dl>
                        <dt>ID</dt>
                        <dd>{course.id}</dd>
                        <dt>Duration</dt>
                        <dd>{getTimeFromMins(course.duration)} hours</dd>
                        <dt>Created</dt>
                        <dd>{course.creationDate}</dd>
                        <dt>Authors</dt>
                        <dd>
                            <ul>
                                {authors.map((author) => (<li key={author.id}>{author.name}</li>))}
                            </ul>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
     );
}

export default CourseInfo;