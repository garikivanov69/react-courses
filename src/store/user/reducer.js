import USER_ACTION_TYPES from "./actionTypes.js";

const initialState = {
    isAuth: false,
    name: '',
    email: '',
    token: ''
};

const userReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case USER_ACTION_TYPES.ADD_USER:
            return payload;
        case USER_ACTION_TYPES.DELETE_USER:
            return initialState;
        default:
            return state;
    }
}

export default userReducer;