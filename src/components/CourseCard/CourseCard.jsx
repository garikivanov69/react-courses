import React from 'react';
import Button from '../Button/Button';
import './CourseCard.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


function CourseCard(props) {
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
    id: PropTypes.any.isRequired
}

export default CourseCard;