import React, {useState, useReducer} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../Button/Button.jsx';
import Input from '../Input/Input.jsx';
import './CreateCourse.css';
import {useFormattingTimeFromMins} from '../../courseUtils.js';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { createActionAddAuthor } from '../../store/authors/actionCreators';
import { createActionAddCourse } from '../../store/courses/actionCreators';
import { courseAdd } from '../../store/servises';
import { selectAuthors } from '../../store/selectors';

function CreateCourse(props) {
    const dispatch = useDispatch();
    let history = useHistory();
    let authors = useSelector(selectAuthors);
    const [duration, setDuration] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [newAuthorName, setNewAuthorName] = useState('');

    const [authorList, setAuthorList] = useState(authors);

    const [choosenAuthors, chooseAuthor] = useReducer(actionDispatch, []);
    const formatDuration = useFormattingTimeFromMins();

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

    function createCourse (event) {
        event.preventDefault();
        if (title && description && duration && choosenAuthors.length) {         
            let currentDate = new Date();
            let courseDate = currentDate.getUTCDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
            let newCourse = {
                id: uuidv4(),
                title: title,
                description: description,
                creationDate: courseDate,
                duration: duration,
                authors: choosenAuthors.map((author) => author.id)
            };
            dispatch(createActionAddCourse(newCourse));
            courseAdd(newCourse, () => history.push('/courses'), () => alert('Error'));
            return;
        }
        alert('Please, fill in all fields of a new course');
    };

    function createAuthor (event) {
        event.preventDefault();
        if (newAuthorName) {
            let author = {
                id: uuidv4(),
                name: newAuthorName
            };
            let flag = authors.length === authorList.length;
            dispatch(createActionAddAuthor(author));
            if (!flag) {
                let arr = Array.from(authorList);
                arr.push(author);
                setAuthorList(arr);
            } else {
                setAuthorList(authors);
            }
            setNewAuthorName('');
            return;
        }

        alert("Please, fill in the author's name field");
    };

    return ( 
        <div className="CreateCourse">
            <form onSubmit={createCourse}>
                <div className="flex container">
                    <div>
                        <label>
                            Title:
                            <Input type="text"  placeholder="Enter title..." handleChange={(event) => setTitle(event.target.value)} />
                        </label>
                    </div>
                    <Button className="button-courses" text="Create course" />
                </div>
                <div className="description container">
                    <label>
                        Description:
                        <textarea placeholder="Enter description..." onChange={(event) => setDescription(event.target.value)} />
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
                                <Input id="duration" type="number"  placeholder="Enter Duration..." handleChange={(event) => setDuration(event.target.value)} />
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

export default CreateCourse;