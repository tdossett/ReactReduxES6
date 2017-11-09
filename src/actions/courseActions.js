import * as types from './actionTypes';
import CourseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadCoursesSuccess(courses) {
    return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function createCourseSuccess(course) {
    return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess(course) {
    return {type: types.UPDATE_COURSE_SUCCESS, course};
}

export function deleteCourseSuccess(courseId) {
    return {type: types.DELETE_COURSE_SUCCESS, courseId};
}

// Thunks
export function loadCourses() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return CourseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            throw(error);
        });
    };
}

export function saveCourse(course) {
    return function(dispatch, getState) {
        dispatch(beginAjaxCall());        
        return CourseApi.saveCourse(course).then(saveCourse => {
            course.id ? dispatch(updateCourseSuccess(saveCourse)) :
            dispatch(createCourseSuccess(saveCourse));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function deleteCourse(courseId) {
    return function(dispatch, getState) {
        dispatch(beginAjaxCall());        
        return CourseApi.deleteCourse(courseId).then(deleteCourse => {
            dispatch(deleteCourseSuccess(courseId));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}