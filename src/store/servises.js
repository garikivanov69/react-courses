import { createActionGetCourses } from './courses/actionCreators';
import { createActionGetAuthors } from './authors/actionCreators';

const host = "http://localhost:3000";

export const fetchCourses = (dispatch, getState) => {
    fetch(host + "/courses/all")
        .then((response) => {
            return response.json()    
        }).then((data) => {
            if (data && data.successful) {
                dispatch(createActionGetCourses(data.result));
            } else {
                console.log('Fetching courses failed');
            }
        }).catch((error) => {
            console.log('Fetching courses failed');
        });
}

export const fetchAuthors = (dispatch, getState) => {
    fetch(host + "/authors/all")
        .then((response) => {
            return response.json()    
        }).then((data) => {
            if (data && data.successful) {
                dispatch(createActionGetAuthors(data.result));
            } else {
                console.log('Fetching courses failed');
            }
        }).catch((error) => {
            console.log('Fetching courses failed');
        });
}

export const loginService = (user, successCallback, emptyDataCallback, errorCallback) => {
    fetch(host + "/login", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        return response.json()    
    }).then((data) => {
        if (data && data.successful) {
            successCallback(data);
        } else {
            emptyDataCallback(data);
        }
    }).catch((error) => errorCallback());
}

export const registrationService = (user, successCallback, emptyDataCallback, errorCallback) => {
    fetch(host + "/register", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json()).then((data) => {
        if (data && data.successful) {
            successCallback();
        } else {
            emptyDataCallback(data);
        }
    }).catch((error) => errorCallback());
};

export const courseAdd = (course, successCallback, errorCallback) => {
    fetch(host + "/courses/add", {
        method: 'POST',
        body: JSON.stringify(course),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => successCallback()).catch((error) => errorCallback());
}