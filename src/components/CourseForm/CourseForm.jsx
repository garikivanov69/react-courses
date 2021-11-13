import React, {useState, useReducer, useEffect} from 'react';
import Button from '../Button/Button.jsx';
import Input from '../Input/Input.jsx';
import './CourseForm.css';
import {useFormattingTimeFromMins} from '../../courseUtils.js';
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import store from '../../store/index';
import { addAuthorThunkWrapper } from '../../store/thunk';
import { selectAuthors, selectUser, selectCourses } from '../../store/selectors';
import PropTypes from 'prop-types';



function CourseForm(props) {
    let user = useSelector(selectUser);
    let authors = useSelector(selectAuthors);
    let courses = useSelector(selectCourses);
    let history = useHistory();
    let { idCourse } = useParams();
    const [duration, setDuration] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [newAuthorName, setNewAuthorName] = useState('');
    const [authorList, setAuthorList] = useState(authors);
    const [choosenAuthors, chooseAuthor] = useReducer(actionDispatch, []);
    const formatDuration = useFormattingTimeFromMins();

    useEffect(() => {
        if (idCourse) {
            let course = courses.find((element, index, array) => element.id === idCourse);
            if (course) {
                setTitle(course.title);
                setDescription(course.description);
                setDuration(course.duration);
                authors.forEach((author) => {
                    if (course.authors.includes(author.id)) { 
                        chooseAuthor({actionType: 'addToCourse', author: author});
                    }
                });
            } else {
                history.push('/404');
            }
        }
    }, []);

    function actionDispatch(choosenAuthors, data) {
        switch(data.actionType) {
            case 'addToCourse': 
                return addAuthorToCourse(choosenAuthors, data);
            case 'deleteFromCourse':
                return deleteAuthorFromCourse(choosenAuthors, data);
            default:
                return choosenAuthors;
        }
    };

    function addAuthorToCourse(choosenAuthors, data) {
        let resultArray = [data.author].concat(choosenAuthors);
        setAuthorList(authorList.filter((author, index, arr) => author.id !== data.author.id));
        return resultArray;
    };

    function deleteAuthorFromCourse (choosenAuthors, data) {
        let resultArray = choosenAuthors.filter((author, index, arr) => author.id !== data.author.id);
        setAuthorList(authorList.concat([data.author]));
        return resultArray;
    };

    function createAuthor (event) {
        event.preventDefault();
        if (newAuthorName) {
            let author = {
                name: newAuthorName
            };
            let arr = Array.from(authorList);
            // arr.push(author);
            // setAuthorList(arr);
            setNewAuthorName('');
            store.dispatch(addAuthorThunkWrapper(user.token, author, (newAuthor) => {
                arr.push(newAuthor);
                setAuthorList(arr);
            }));
            return;
        }

        alert("Please, fill in the author's name field");
    };

    function submitHandler(event) {
        event.preventDefault();
        if (title && description && duration && choosenAuthors.length) {         
            let newCourse = {
                title: title,
                description: description,
                duration: duration,
                authors: choosenAuthors.map((author) => author.id)
            };
            props.submit(history, newCourse, idCourse);
        } else {
            alert('Please, fill in all fields of a new course');
        }
    };

    return ( 
        <div className="CreateCourse">
            <form onSubmit={submitHandler}>
                <div className="flex container">
                    <div>
                        <label>
                            Title:
                            <Input type="text" value={title} placeholder="Enter title..." handleChange={(event) => setTitle(event.target.value)} />
                        </label>
                    </div>
                    <Button className="button-courses" text={props.buttonText} />
                </div>
                <div className="description container">
                    <label>
                        Description:
                        <textarea value={description} placeholder="Enter description..." onChange={(event) => setDescription(event.target.value)} />
                    </label>
                </div>
                <section className="container flex">
                    <div className="column">
                        <div>
                            <h3>Add author</h3>
                            <label>
                                Author name:
                                <Input value={newAuthorName} id="author-name" type="text"  placeholder="Enter author name..." handleChange={(event) => setNewAuthorName(event.target.value)} />
                            </label>
                            <Button className="button-courses" onClick={createAuthor} text="Create author" />
                        </div>
                        <div className="duration">
                            <h3>Duration</h3>
                            <label>
                                Duration:
                                <Input id="duration" type="number" value={duration}  placeholder="Enter Duration..." handleChange={(event) => setDuration(Number(event.target.value))} />
                            </label>
                            <p className="font-larger" >Duration:</p> <p className="font-x-large font-bold">{formatDuration(duration)}</p> <p className="font-larger" >hours</p>
                        </div>
                    </div>
                    <div className="column">
                        <div>
                            <h3>Authors</h3>
                            <ul>
                                {authorList.map((author) => <li key={author.id}>
                                        <div className="flex-center-wrapper">
                                            <p className="author-name">{author.name}</p>
                                            <Button className="button-courses" onClick={() => chooseAuthor({actionType: 'addToCourse', author: author})} text="Add author" />
                                        </div>
                                    </li>)}
                            </ul>
                        </div>
                        <div>
                            <h3>Course authors</h3>
                            <ul>
                            {choosenAuthors.length ? choosenAuthors.map((author) => 
                                    <li key={author.id}>
                                        <div className="flex-center-wrapper">
                                            <p className="author-name">{author.name}</p>
                                            <Button className="button-courses" onClick={() => chooseAuthor({actionType: 'deleteFromCourse', author: author})} text="Delete author" />
                                        </div>
                                    </li>) : <li>Author list is empty</li>}
                            </ul>
                        </div>
                    </div>
                </section>
            </form>
        </div>
    );
}

CourseForm.propTypes = {
    submit: PropTypes.func,
    buttonText: PropTypes.string
}

export default CourseForm;