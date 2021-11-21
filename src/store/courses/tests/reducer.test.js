import coursesReducer from '../reducer';
import { createActionAddCourse, createActionGetCourses } from '../actionCreators';

const course = {
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
};

it("Reducer should return the initial state", () => {
    expect(coursesReducer(undefined, {})).toEqual([]);
});

it("Reducer should handle ADD_COURSE and returns new state", () => {
    expect(coursesReducer([], createActionAddCourse(course))).toEqual([course]);
});

it("Reducer should handle GET_COURSES and returns new state", () => {
    expect(coursesReducer([], createActionGetCourses(course))).toEqual(course);
});

