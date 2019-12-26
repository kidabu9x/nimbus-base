/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "../../layouts/quiz";
import Body from "./Body";

import { getCode } from "../../store/courseCode/Actions";
import { getQuizzes, setQuiz } from "../../store/courseQuizzes/Actions";
import { getQuestions } from "../../store/courseQuizQuestions/Actions";
import {
  setStep,
  setQuestionIndex,
  toggleMenuAvailable,
  toggleShowMenu,
  bookmark
} from "../../store/courseQuizTest/Actions";
import { logout } from "../../store/auth/Actions";

const mapStateToProps = state => ({
  code: state.courseCode.code,
  codeLoading: state.courseCode.loading,
  codeInvalid: state.courseCode.isInvalid,
  quiz: state.courseQuizzes.quiz,
  quizzes: state.courseQuizzes.quizzes,
  quizzesLoading: state.courseQuizzes.loading,
  questions: state.courseQuizQuestions.questions,
  questionsLoading: state.courseQuizQuestions.loading,
  step: state.courseQuizTest.step,
  questionIndex: state.courseQuizTest.index,
  menuAvailable: state.courseQuizTest.menuAvailable,
  showMenu: state.courseQuizTest.showMenu,
  bookmarks: state.courseQuizTest.bookmarks
});

const mapDispatchToProps = {
  getCode,
  logout,
  getQuizzes,
  setQuiz,
  getQuestions,
  setStep,
  setQuestionIndex,
  toggleMenuAvailable,
  toggleShowMenu,
  bookmark
};

class Quiz extends Component {
  // Step Explaination
  //
  // On the server with error:
  // 1. validate code
  // 2. select quiz
  // 3. gerate random questions and start testing
  // 4. show result

  /**
   * Step 1.Validate code then switch to step 2
   */
  onGetCode = async code => {
    const { getCode } = this.props;
    await getCode(code);
    const { codeInvalid } = this.props;
    if (!codeInvalid) {
      this.onGetQuizzes();
    }
  };

  /**
   * Step 2.Select quiz, then switch to step 3
   */
  onGetQuizzes = async () => {
    const { setStep, getQuizzes } = this.props;
    await getQuizzes();
    setStep(2);
  };
  onSetQuiz = async quizId => {
    const { setQuiz } = this.props;
    setQuiz(quizId);
    this.onGetQuestion();
  };

  /**
   * Step 3.Fetch questions and starting test
   */
  onGetQuestion = async () => {
    const { getQuestions } = this.props;
    await getQuestions();
    const { setStep, questions } = this.props;
    if (questions.length) {
      this.onSetQuestionIndex(0);
    }
    setStep(3);
  };

  onSetQuestionIndex = index => {
    const { setQuestionIndex } = this.props;
    setQuestionIndex(index);
  };

  onToggleMenuAvailable = () => {
    const { toggleMenuAvailable } = this.props;
    toggleMenuAvailable();
  };

  onToggleShowMenu = () => {
    const { menuAvailable, toggleShowMenu } = this.props;
    if (!menuAvailable) this.onToggleMenuAvailable();
    toggleShowMenu();
  };

  onSwitchAccount = () => {
    const { logout } = this.props;
    logout();
  };

  onBookmark = () => {
    const { bookmark } = this.props;
    bookmark();
  };

  render() {
    const { ...props } = this.props;
    return (
      <Layout>
        <Body
          {...props}
          onSetStep={this.setStep}
          onSetQuiz={this.onSetQuiz}
          onSwitchAccount={this.onSwitchAccount}
          onGetCode={this.onGetCode}
          onSetQuestionIndex={this.onSetQuestionIndex}
          onToggleShowMenu={this.onToggleShowMenu}
          onBookmark={this.onBookmark}
        ></Body>
      </Layout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
