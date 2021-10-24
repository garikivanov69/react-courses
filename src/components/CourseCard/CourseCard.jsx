import React from 'react';
import Button from '../Button/Button';
import './CourseCard.css';

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
                    <dd>{props.duration}</dd>
                    <dt>Created</dt>
                    <dd>{props.creationDate}</dd>
                </dl>
                <Button text="Show course" />
            </div>
        </div>
     );
}

export default CourseCard;