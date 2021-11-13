import USER_ACTION_TYPES from "./actionTypes.js";

export const createActionDeleteUser = (value) => {
    return { 
        type: USER_ACTION_TYPES.DELETE_USER,
        payload: value
    };
};

export const createActionAddUser = (value) => {
    return { 
        type: USER_ACTION_TYPES.ADD_USER,
        payload: value
    };
}

export const createActionSetUserRole = (value) => {
    return { 
        type: USER_ACTION_TYPES.SET_ROLE,
        payload: value
    };
}