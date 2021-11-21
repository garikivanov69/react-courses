import React from 'react';
import * as redux from 'react-redux'
import CourseCard from '../CourseCard';
import { render } from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';

it("CourseCard should display title, description, duration, creation date, authors list", () => {
    const spy = jest.spyOn(redux, 'useSelector')
    spy.mockReturnValue({
        isAuth: true,
        name: 'name',
        email: 'email@email.com',
        token: '1234',
        role: 'user'
    });

    const history = createMemoryHistory();

    const {getByText} = render(
    <Router history={history}>
        <CourseCard title="testTitle" description="description" duration="1:11" creationDate="1/1/21" id="1" authors="Pushkin"></CourseCard>
    </Router>);
    expect(getByText('testTitle')).toBeInTheDocument();
    expect(getByText('description')).toBeInTheDocument();
    expect(getByText('1:11 hours')).toBeInTheDocument();
    expect(getByText('1/1/21')).toBeInTheDocument();
    expect(getByText('Pushkin')).toBeInTheDocument();

});
