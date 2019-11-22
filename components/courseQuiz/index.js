import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Layout from "../../layouts/quiz";
import Body from "./Body";

import { getCode } from "../../store/courseCode/Actions";
import { getQuizzes, setQuiz } from "../../store/courseQuizzes/Actions";
import {
  getQuestions,
  setQuestionIndex,
  toggleMenuAvailable,
  toggleShowMenu,
  bookmark
} from "../../store/courseQuizQuestions/Actions";
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
  questionIndex: state.courseQuizQuestions.index,
  menuAvailable: state.courseQuizQuestions.menuAvailable,
  showMenu: state.courseQuizQuestions.showMenu,
  bookmarks: state.courseQuizQuestions.bookmarks
});

const mapDispatchToProps = {
  getCode,
  logout,
  getQuizzes,
  setQuiz,
  getQuestions,
  setQuestionIndex,
  toggleMenuAvailable,
  toggleShowMenu,
  bookmark
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
    this.onGetQuestion();
    this.nextStep();
  };

  onGetQuestion = async () => {
    const { getQuestions } = this.props;
    await getQuestions();
    const { questions } = this.props;
    if (questions.length) {
      this.onSetQuestionIndex();
    }
  };

  onSetQuestionIndex = index => {
    const { setQuestionIndex } = this.props;
    index = typeof index === "number" && index > -1 ? index : 0;
    setQuestionIndex(index);
  };

  onToggleMenuAvailable = () => {
    const { toggleMenuAvailable } = this.props;
    toggleMenuAvailable();
  };

  onToggleShowMenu = () => {
    const { toggleShowMenu } = this.props;
    toggleShowMenu();
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

  onBookmark = () => {
    const { bookmark } = this.props;
    bookmark();
  };

  render() {
    const { step } = this.state;
    const {
      user,
      codeLoading,
      codeInvalid,
      quizzes,
      quiz,
      quizzesLoading,

      // testing property
      questions,
      questionIndex,
      menuAvailable,
      showMenu,
      bookmarks
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
          // Question
          questions={questions}
          bookmarks={bookmarks}
          questionIndex={questionIndex}
          menuAvailable={menuAvailable}
          showMenu={showMenu}
          onSetQuestionIndex={this.onSetQuestionIndex}
          onToggleShowMenu={this.onToggleShowMenu}
          onBookmark={this.onBookmark}
          onToggleMenuAvailable={this.onToggleMenuAvailable}
        ></Body>
      </Layout>
    );
  }
}

Quiz.propTypes = {
  logout: PropTypes.func,
  getCode: PropTypes.func,
  user: PropTypes.object,
  codeInvalid: PropTypes.bool,
  codeLoading: PropTypes.bool,
  getQuestions: PropTypes.func,
  questions: PropTypes.array,
  bookmarks: PropTypes.array,
  toggleMenuAvailable: PropTypes.func,
  toggleShowMenu: PropTypes.func,
  showMenu: PropTypes.bool,
  menuAvailable: PropTypes.bool,
  questionIndex: PropTypes.number,
  setQuestionIndex: PropTypes.func,
  bookmark: PropTypes.func,
  // quiz
  quizzes: PropTypes.array,
  quiz: PropTypes.object,
  getQuizzes: PropTypes.func,
  setQuiz: PropTypes.func,
  quizzesLoading: PropTypes.bool,
  questionsLoading: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
