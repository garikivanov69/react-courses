import React from 'react';
import { useState, useEffect, useContext } from 'react';
import Button from '../Button/Button';
import { Link, useParams } from 'react-router-dom';
import{CoursesContext} from '../../index.js';
import { useHistory } from "react-router-dom";
import './CourseInfo.css';
import {useFormattingTimeFromMins} from '../../courseUtils.js'


function CourseInfo(props) {
    const repository = useContext(CoursesContext);
    const [course, setCourse] = useState({});
    const [authors, setAuthors] = useState([]);
    let { idCourse } = useParams();
    let history = useHistory();
    const getTimeFromMins = useFormattingTimeFromMins();


    let getAuthors = function (course) {
        let res = [];
        console.log(course.authors);
        for (let i = 0; i < course.authors.length; i++) {
            for (let j = 0; j < repository.mockedAuthorsList.length; j++) {
                if (course.authors[i] === repository.mockedAuthorsList[j].id) {
                    res.push(repository.mockedAuthorsList[j]);
                    break;
                }
            }
        }
        return res;
    };
    
    useEffect(() => {
        let courseInfo = repository.mockedCoursesList.find((element, index, arr) => element.id === idCourse);
        if (courseInfo) {
            setCourse(courseInfo);
            console.log(courseInfo);
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