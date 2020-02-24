/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core";
import Layout from "../../layouts/quiz";
import styles from "./styles";

import ErrorModal from "./components/ErrorModal";
import ValidateCode from "./components/ValidateCode";
import SelectQuiz from "./components/SelectQuiz";
import Question from "./components/Question";
import Summary from "./components/Summary";

import { getCode } from "../../store/courseCode/Actions";
import { getQuizzes, setQuiz } from "../../store/courseQuizzes/Actions";

import {
  setStep,
  setQuestionIndex,
  toggleMenuAvailable,
  toggleShowMenu,
  bookmark,
  getQuestions,
  submit
} from "../../store/courseQuizTest/Actions";

const mapStateToProps = state => ({
  code: state.courseCode.code,

  quiz: state.courseQuizzes.quiz,
  quizzes: state.courseQuizzes.quizzes,

  questions: state.courseQuizTest.questions,
  step: state.courseQuizTest.step,
  questionIndex: state.courseQuizTest.index,
  bookmarks: state.courseQuizTest.bookmarks,
  submitted: state.courseQuizTest.submitted,
  openScoreNotification: state.courseQuizTest.openScoreNotification
});

const mapDispatchToProps = {
  getCode,
  getQuizzes,
  setQuiz,
  getQuestions,
  setStep,
  setQuestionIndex,
  toggleMenuAvailable,
  toggleShowMenu,
  bookmark,
  submit
};

class Quiz extends Component {
  state = {
    showError: false,
    loading: false,
    codeInvalid: false,
    showMenu: false,
    showScoreNotification: false,
    showGenericError: false
  };

  toggleError = () => {
    this.setState({
      showError: !this.state.showError
    });
  };

  setCodeInvalid = bol => {
    this.setState({
      codeInvalid: bol
    });
  };

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  onGetCode = async code => {
    try {
      this.setCodeInvalid(false);

      this.toggleLoading();

      const { getCode } = this.props;
      await getCode(code);

      await this.onGetQuizzes();
    } catch (error) {
      this.setCodeInvalid(true);
    } finally {
      this.toggleLoading();
    }
  };

  /**
   * Step 2.Select quiz, then switch to step 3
   */
  onGetQuizzes = async () => {
    try {
      const { setStep, getQuizzes } = this.props;
      await getQuizzes();
      setStep(2);
    } catch (error) {
      this.toggleError();
    }
  };

  onSetQuiz = async quizId => {
    try {
      this.toggleLoading();
      const { setQuiz } = this.props;
      setQuiz(quizId);
      await this.onGetQuestion();
    } catch (error) {
      this.toggleError();
    } finally {
      this.toggleLoading();
    }
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
    const { setQuestionIndex, showMenu, toggleShowMenu, setStep } = this.props;
    setQuestionIndex(index);
    console.log(showMenu);
    if (showMenu) {
      toggleShowMenu();
      setStep(3);
    }
  };

  onToggleShowMenu = () => {
    const {
      menuAvailable,
      toggleShowMenu,
      toggleMenuAvailable,
      setStep
    } = this.props;
    if (!menuAvailable) toggleMenuAvailable();
    toggleShowMenu();
    setStep(4);
  };

  onBookmark = () => {
    const { bookmark } = this.props;
    bookmark();
  };

  onSubmit = () => {
    try {
      this.toggleLoading();
      const { submit } = this.props;
      submit();
    } catch (error) {
      this.toggleError();
    } finally {
      this.toggleLoading();
    }
  };

  onSetStep = step => {
    const { setStep } = this.props;
    setStep(step);
  };

  render() {
    const {
      classes,
      step,
      user,
      quizzes,
      quiz,
      questions,
      questionIndex,
      bookmarks,

      submitted
    } = this.props;

    const { showError, loading, showMenu, codeInvalid } = this.state;

    const Step = () => {
      switch (step) {
        case 1:
          return (
            <ValidateCode
              user={user}
              loading={loading}
              codeInvalid={codeInvalid}
              onGetCode={this.onGetCode}
            />
          );
        case 2:
          return (
            <SelectQuiz
              quizzes={quizzes}
              quiz={quiz}
              loading={loading}
              onSetQuiz={this.onSetQuiz}
              onSelectCode={() => this.onSetStep(1)}
            />
          );
        case 3:
          return (
            <Question
              questions={questions}
              bookmarks={bookmarks}
              questionIndex={questionIndex}
              loading={loading}
              showMenu={showMenu}
              onSetQuestionIndex={this.onSetQuestionIndex}
              onToggleShowMenu={this.onToggleShowMenu}
              onBookmark={this.onBookmark}
            />
          );
        case 4:
          return (
            <Summary
              questions={questions}
              bookmarks={bookmarks}
              loading={loading}
              submitted={submitted}
              onSetQuestionIndex={this.onSetQuestionIndex}
              onSubmit={this.onSubmit}
            />
          );
        default:
          break;
      }
    };

    return (
      <Layout>
        <div className={classes.root}>
          <div className={classes.container}>
            <div className={classes.wrapper}>
              {/* <LinearProgress className={classes.loadingBar} /> */}
              {loading ? (
                <LinearProgress className={classes.loadingBar} />
              ) : null}
              <Step />

              <ErrorModal open={showError} toggle={this.toggleError} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Quiz));
