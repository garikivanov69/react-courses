import AUTHOR_ACTION_TYPES from "./actionTypes.js";

const initialState = [];

const authorsReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case AUTHOR_ACTION_TYPES.GET_AUTHORS:
            return payload;
        case AUTHOR_ACTION_TYPES.ADD_AUTHOR:
            return state.concat(payload);
        default:
            return state;
    }
}

export default authorsReducer;