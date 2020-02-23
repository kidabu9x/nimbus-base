import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import RequireAuth from "../../../ultis/RequireAuth";
import { getCourse } from "../../../store/courses/Actions";
import Quiz from "../../../components/courseQuiz";

const mapStateToProps = state => ({
  course: state.courses.course
});

class Render extends Component {
  static async getInitialProps({ query, reduxStore }) {
    const { courseId } = query;
    const rootState = reduxStore.getState();
    const { course } = rootState.courses;
    await reduxStore.dispatch(getCourse(courseId));
    return {
      course
    };
  }

  render() {
    return (
      <Fragment>
        <Quiz {...this.props} />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, {})(RequireAuth(Render));
