import AUTHOR_ACTION_TYPES from "./actionTypes.js";

export const createActionGetAuthors = (value) => {
    return { 
        type: AUTHOR_ACTION_TYPES.GET_AUTHORS,
        payload: value
    };
};

export const createActionAddAuthor = (value) => {
    return { 
        type: AUTHOR_ACTION_TYPES.ADD_AUTHOR,
        payload: value
    };
}