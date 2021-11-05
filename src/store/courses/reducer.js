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
            state.push(payload);
            return state;
        case COURSES_ACTION_TYPES.UPDATE_COURSE:
            return state;
        default:
            return state;
    }
}

export default coursesReducer;