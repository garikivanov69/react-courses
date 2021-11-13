import COURSES_ACTION_TYPES from "./actionTypes.js";

const initialState = [];

const coursesReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case COURSES_ACTION_TYPES.GET_COURSES:
            return payload;
        case COURSES_ACTION_TYPES.DELETE_COURSE:
            return state.filter((course) => course.id !== payload); 
        case COURSES_ACTION_TYPES.ADD_COURSE:
            return state.concat(payload);
        case COURSES_ACTION_TYPES.UPDATE_COURSE:
            return state.map((course) => course.id === payload.id ? payload : course);
        default:
            return state;
    }
}

export default coursesReducer;