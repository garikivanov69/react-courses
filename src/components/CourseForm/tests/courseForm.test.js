import React from 'react';
import {Provider} from 'react-redux';
import CourseForm from '../CourseForm';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {Router} from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';

const mockStore = configureMockStore([thunk]);

afterEach(cleanup);

test("List of authors should be displaied", () => {
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

    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
        useParams: () => ({
            idCourse: ''
        })
      }));
    
    const history = createMemoryHistory()

    const {getAllByTestId} = render(
        <Provider store={store}>
            <Router history={history}>
                <CourseForm />
            </Router>
        </Provider>
    );

    expect(getAllByTestId("Author list")).toHaveLength(4);
});

test("List of choosen authors should be displaied correctly", async () => {
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

    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
        useParams: () => ({
            idCourse: ''
        })
      }));
    
    const history = createMemoryHistory()

    const {getAllByTestId, getAllByText} = render(
        <Provider store={store}>
            <Router history={history}>
                <CourseForm />
            </Router>
        </Provider>
    );
    
    fireEvent.click(getAllByText('Add')[0]);
    expect(getAllByTestId("Author list")).toHaveLength(3);

    fireEvent.click(getAllByText('Delete')[0]);
    expect(getAllByTestId("Author list")).toHaveLength(4);
});

test("'Create author' click button should call dispatch.", () => {
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

    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
        useParams: () => ({
            idCourse: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba'
        })
      }));
    
    const history = createMemoryHistory();
    jest.spyOn(store, 'dispatch');


    const {getByText, getByPlaceholderText} = render(
        <Provider store={store}>
            <Router history={history}>
                <CourseForm buttonText="Create course" />
            </Router>
        </Provider>
    );
    
    fireEvent.change(getByPlaceholderText("Enter author name..."), { target: { value: 'newAuthor' } });
    fireEvent.click(getByText('Create author'));

    expect(store.dispatch).toBeCalled();
});