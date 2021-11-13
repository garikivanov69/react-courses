import React from 'react';
import Button from '../Button/Button';
import './CourseCard.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import pencil from './pencil.svg';
import basket from './basket.svg';
import { selectUser } from '../../store/selectors';
import { useSelector } from 'react-redux';
import store from '../../store/index';
import { deleteCourseThunkWrapper } from '../../store/thunk';



function CourseCard(props) {
    let user = useSelector(selectUser);

    return ( 
        <div className="CourseCard">
            <div className="CourseCard-title-description">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
            <div>
                <dl>
                    <dt>Authors</dt>
                    <dd className="authors">{props.authors}</dd>
                    <dt>Duration</dt>
                    <dd>{props.duration} hours</dd>
                    <dt>Created</dt>
                    <dd>{props.creationDate}</dd>
                </dl>
                <Link to={"/courses/" + props.id} ><Button text="Show course" /></Link>
                {user.role === 'admin' ? 
                    <Link to={"/courses/update/" + props.id} >
                        <Button >
                            <img src={pencil} alt="Edit"/>
                        </Button>
                    </Link> : ''}
                {user.role === 'admin' ?
                    <Button onClick={(event) => {
                        store.dispatch(deleteCourseThunkWrapper(user.token, props.id));
                        props.setCourses(props.courses.filter((course) => course.id !== props.id));
                        }}>
                        <img src={basket} alt="Delete" />
                    </Button> : ''}
            </div>
        </div>
     );
}

CourseCard.propTypes = {
    title: PropTypes.node,
    description: PropTypes.node,
    authors: PropTypes.node,
    duration: PropTypes.node,
    creationDate: PropTypes.node,
    id: PropTypes.any.isRequired,
    setCourses: PropTypes.func,
    courses: PropTypes.array
}

export default CourseCard;