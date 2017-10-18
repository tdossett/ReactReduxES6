import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

// Test a sync action
describe('Course Actions', () => {
    describe('createCourseSuccess', () => {
        it('should create a CREATE_COURSE_SUCCESS action', () => {
            //arrange 
            const course = {id: 'clean-code', title: 'Clean Code'};
            const exepctedAction = {
                type: types.CREATE_COURSE_SUCCESS,
                course: course
            };

            //act
            const action = courseActions.createCourseSuccess(course);

            //assert
            expect(action).toEqual(exepctedAction);
        });
    });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loadind course', (done) => {
        // Here's an example call to mock
        // nock('http://example.com')
        //   .get(/courses)
        //   .reply(200, {body: { course: [{ id: 1, firstName: 'Cory', lastName: 'House'}] }});

        //arrange
        const exepctedActions = [
            {type: types.BEGIN_AJAX_CALL},
            {type: types.LOAD_COURSES_SUCCESS, body: {courses: [{id: 'clean-code', title: 'Clean Code'}]}}
        ];

        const store = mockStore({courses: []}, exepctedActions);
        store.dispatch(courseActions.loadCourses()).then(() => {
            const actions = store.getActions();
            //asserts
            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type.LOAD_COURSES_SUCCESS);
            //end async call
            done();
        });
    });
});