import { logoutService, getUserInfoService, deleteCourseService, courseAddService, authorAddService, courseUpdateService } from './servises';
import { createActionDeleteUser, createActionSetUserRole, createActionAddUser } from './user/actionCreators';
import { createActionDeleteCourse, createActionAddCourse, createActionUpdateCourse } from './courses/actionCreators';
import { createActionAddAuthor } from './authors/actionCreators';


export const logoutThunkWrapper = (token, history) => {
    return async function logoutThunk(dispatch, getState) {
        logoutService(token, () => {
            localStorage.removeItem('courses-user');
            history.push("/login");
        }, () => console.log('Failed logout'));
        dispatch(createActionDeleteUser());
    };
};

export const getUserRoleThunkWrapper = (token) => {
    return async function getUserInfoThunk(dispatch, getState) {
        getUserInfoService(token, (info) => { dispatch(createActionSetUserRole(info.role));}, () => console.log('Failed get user info'), () => console.log('Failed get user info'));
    };
};

export const getUserByTokenThunkWrapper = (token) => {
    return async function getUserInfoThunk(dispatch, getState) {
        getUserInfoService(token, (info) => { dispatch(createActionAddUser({isAuth: true, name: info.name, email: info.email, token: token, role: info.role}));}, () => console.log('Failed get user info'), () => console.log('Failed get user info'));
    };
};

export const deleteCourseThunkWrapper = (token, courseId) => {
    return async function deleteCourseThunk(dispatch, getState) {
        deleteCourseService(token, courseId, () => { dispatch(createActionDeleteCourse(courseId));}, () => console.log('Failed deleting course'));
    };
};

export const addCourseThunkWrapper = (token, course, history) => {
    return async function addCourseThunk(dispatch, getState) {
        courseAddService(token, course, (newCourse) => { 
            dispatch(createActionAddCourse(newCourse));
            history.push('/courses');
        }, () => console.log('Failed adding course'), () => console.log('Failed adding course'));
    };
};

export const updateCourseThunkWrapper = (token, id, course, history) => {
    return async function updateCourseThunk(dispatch, getState) {
        courseUpdateService(token, id, course, (newCourse) => { 
            dispatch(createActionUpdateCourse(newCourse));
            history.push('/courses');
        }, () => console.log('Failed updating course'), () => console.log('Failed updating course'));
    };
};

export const addAuthorThunkWrapper = (token, author, successCallback) => {
    return async function addAuthorThunk(dispatch, getState) {
        authorAddService(token, author, (newAuthor) => {
            successCallback(newAuthor);
            dispatch(createActionAddAuthor(newAuthor));
        }, () => console.log('Failed adding author'), () => console.log('Failed adding author'));
    };
};
