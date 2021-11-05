import COURSES_ACTION_TYPES from "./actionTypes.js";

export const createActionGetCourses = (value) => {
    return { 
        type: COURSES_ACTION_TYPES.GET_COURSES,
        payload: value
    };
};

export const createActionAddCourse = (value) => {
    return { 
        type: COURSES_ACTION_TYPES.ADD_COURSE,
        payload: value
    };
}

export const createActionDeleteCourse = (value) => {
    return { 
        type: COURSES_ACTION_TYPES.DELETE_COURSE,
        payload: value
    };
}

export const createActionUpdateCourse = (value) => {
    return { 
        type: COURSES_ACTION_TYPES.UPDATE_COURSE,
        payload: value
    };
}