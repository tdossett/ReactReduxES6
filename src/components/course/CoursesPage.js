import React, {PropTypes} from  'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    deleteCourse(event) {
        event.preventDefault();

        const courseId = event.target.value;

        this.props.actions.deleteCourse(courseId)
            .then(() => this.redirect()) // (Delayed) - Redirect will only be called when saveCourse promise is resolved
            .catch(error => {
                toastr.error(error);
            });
    }

    redirect(){
        toastr.success('Course Deleted');
        //this.context.router.push('/courses');
       // browserHistory.push('/courses');
    }

    redirectToAddCoursePage() {
        browserHistory.push('/course');
    }
    
    render () {
        const {courses} = this.props;

        return (
            <div>
                <h1>Courses</h1>
                <input type="submit"
                    value="Add Course"
                    className="btn btn-primary btn-sm"
                    onClick={this.redirectToAddCoursePage}/>
                <CourseList 
                courses={courses}
                onDelete={this.deleteCourse}/>
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses
    };
}

function mapDispatchTpProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchTpProps)(CoursesPage);