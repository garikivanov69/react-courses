import React from 'react';
import {Provider} from 'react-redux';
import Courses from '../Courses';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '../../../App';

const mockStore = configureMockStore([thunk]);

afterEach(cleanup);

test("Courses should display a course list", () => {
    const store = mockStore({
        user: {
            isAuth: true,
            name: 'name',
            email: 'email@email.com',
            token: '1234',
            role: 'user'
        }, 
        courses:  [
            {
                id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
                title: 'JavaScript',
                description: `Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum 
                has been the industry's standard dummy text ever since
            the 1500s, when an unknown 
                printer took a galley of type and scrambled it to make
            a type specimen book. It has survived 
                not only five centuries, but also the leap into
            electronic typesetting, remaining essentially u
                nchanged.`,
                creationDate: '8/3/2021',
                duration: 160,
                authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d', 'f762978b-61eb4096-812b-ebde22838167'],
            }
        ],
        authors:  [
            {
            id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
            name: 'Vasiliy Dobkin'
            },
            {
            id: 'f762978b-61eb-4096-812b-ebde22838167',
            name: 'Nicolas Kim'
            },
            {
            id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
            name: 'Anna Sidorenko'
            },
            {
            id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
            name: 'Valentina Larina'
            },
           ]
    });

    const history = createMemoryHistory()

    const {container} = render(
        <Provider store={store}>
            <Router history={history}>
                <Courses></Courses>
            </Router>
        </Provider>
    );

    expect(container.querySelector(".Courses").children).toHaveLength(1);
});

test("Courses should display a course list without items", () => {
    const store = mockStore({
        user: {
            isAuth: true,
            name: 'name',
            email: 'email@email.com',
            token: '1234',
            role: 'user'
        }, 
        courses:  [
            
        ],
        authors:  [
            {
            id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
            name: 'Vasiliy Dobkin'
            },
            {
            id: 'f762978b-61eb-4096-812b-ebde22838167',
            name: 'Nicolas Kim'
            },
            {
            id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
            name: 'Anna Sidorenko'
            },
            {
            id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
            name: 'Valentina Larina'
            },
           ]
    });

    const history = createMemoryHistory()

    const {container} = render(
        <Provider store={store}>
            <Router history={history}>
                <Courses></Courses>
            </Router>
        </Provider>
    );

    expect(container.querySelector(".Courses").children).toHaveLength(0);
});

test("CourseForm should be rendered after clicking on 'Create course'", () => {
    const store = mockStore({
        user: {
            isAuth: true,
            name: 'name',
            email: 'email@email.com',
            token: '1234',
            role: 'admin'
        }, 
        courses:  [
            {
                id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
                title: 'JavaScript',
                description: `Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum 
                has been the industry's standard dummy text ever since
            the 1500s, when an unknown 
                printer took a galley of type and scrambled it to make
            a type specimen book. It has survived 
                not only five centuries, but also the leap into
            electronic typesetting, remaining essentially u
                nchanged.`,
                creationDate: '8/3/2021',
                duration: 160,
                authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d', 'f762978b-61eb4096-812b-ebde22838167'],
            }
        ],
        authors:  [
            {
            id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
            name: 'Vasiliy Dobkin'
            },
            {
            id: 'f762978b-61eb-4096-812b-ebde22838167',
            name: 'Nicolas Kim'
            },
            {
            id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
            name: 'Anna Sidorenko'
            },
            {
            id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
            name: 'Valentina Larina'
            },
           ]
    });

    const {getByLabelText, getByText} = render(
        <Provider store={store}>
            <App></App>
        </Provider>
    );
    
    fireEvent.click(getByText('Create course'));
    expect(getByLabelText('Title:')).toBeInTheDocument();
});

