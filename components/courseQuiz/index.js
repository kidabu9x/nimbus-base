import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Layout from "../../layouts/quiz";
import Body from "./Body";

import { getCode } from "../../store/courseCode/Actions";
import { getQuizzes, setQuiz } from "../../store/courseQuizzes/Actions";
import { logout } from "../../store/auth/Actions";

const mapStateToProps = state => ({
  code: state.courseCode.code,
  codeLoading: state.courseCode.loading,
  codeInvalid: state.courseCode.isInvalid,
  quiz: state.courseQuizzes.quiz,
  quizzes: state.courseQuizzes.quizzes,
  quizzesLoading: state.courseQuizzes.loading
});

const mapDispatchToProps = {
  getCode,
  logout,
  getQuizzes,
  setQuiz
};

class Quiz extends Component {
  // Step Explaination
  //
  // On the server with error:
  // 1. check code
  // 2. select quiz
  // 3. testing
  // 4. show result
  state = {
    step: 1
  };

  onGetCode = async code => {
    const { getCode, getQuizzes } = this.props;
    await getCode(code);
    const { codeInvalid } = this.props;
    if (!codeInvalid) {
      await getQuizzes();
      this.nextStep();
    }
  };

  onSetQuiz = async quizId => {
    const { setQuiz } = this.props;
    setQuiz(quizId);
    this.nextStep();
  };

  nextStep = () => {
    let { step } = this.state;
    step = step + 1;
    this.setState({
      step
    });
  };

  backStep = () => {
    let { step } = this.state;
    step = step - 1;
    this.setState({
      step: step
    });
  };

  onSwitchAccount = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    const { step } = this.state;
    const {
      user,
      codeLoading,
      codeInvalid,
      quizzes,
      quiz,
      quizzesLoading
    } = this.props;
    return (
      <Layout>
        <Body
          user={user}
          step={step}
          codeInvalid={codeInvalid}
          codeLoading={codeLoading}
          onGetCode={this.onGetCode}
          quizzes={quizzes}
          quiz={quiz}
          quizzesLoading={quizzesLoading}
          onSetQuiz={this.onSetQuiz}
          onSwitchAccount={this.onSwitchAccount}
          onBackStep={this.backStep}
        ></Body>
      </Layout>
    );
  }
}

Quiz.propTypes = {
  getCode: PropTypes.func,
  user: PropTypes.object,
  codeInvalid: PropTypes.bool,
  codeLoading: PropTypes.bool,
  logout: PropTypes.func,
  // quiz
  quizzes: PropTypes.array,
  quiz: PropTypes.object,
  getQuizzes: PropTypes.func,
  setQuiz: PropTypes.func,
  quizzesLoading: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
