/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core";
import Layout from "../../layouts/quiz";
import styles from "./styles";

import ErrorModal from "./components/ErrorModal";
import ResultModal from "./components/ResultModal";
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
  bookmark,
  getQuestions,
  submit,
  reset
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
  menuAvailable: state.courseQuizTest.menuAvailable,
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
  bookmark,
  submit,
  reset
};

class Quiz extends Component {
  state = {
    showError: false,
    loading: false,
    codeInvalid: false,
    showMenu: false,
    showScoreNotification: false,
    showGenericError: false,
    showResultModal: false
  };

  toggleError = () => {
    this.setState({
      showError: !this.state.showError
    });
  };

  toggleShowResultModal = () => {
    this.setState({
      showResultModal: !this.state.showResultModal
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
    const { setQuestionIndex } = this.props;
    setQuestionIndex(index);
  };

  onToggleMenuAvailable = () => {
    const { menuAvailable, toggleMenuAvailable } = this.props;
    if (!menuAvailable) toggleMenuAvailable();
  };

  onBookmark = () => {
    const { bookmark } = this.props;
    bookmark();
  };

  onSubmit = async () => {
    try {
      this.toggleLoading();
      const { submit } = this.props;
      await submit();

      this.toggleShowResultModal();
    } catch (error) {
      this.toggleError();
    } finally {
      this.toggleLoading();
    }
  };

  onReSelectQuiz = async () => {
    const { reset } = this.props;
    reset();
    this.onSetStep(2);
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
      menuAvailable,

      submitted
    } = this.props;

    const { showError, loading, codeInvalid, showResultModal } = this.state;

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
              submitted={submitted}
              loading={loading}
              menuAvailable={menuAvailable}
              onSetQuestionIndex={this.onSetQuestionIndex}
              onToggleMenuAvailable={this.onToggleMenuAvailable}
              onSetStep={this.onSetStep}
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
              onSetStep={this.onSetStep}
              onSubmit={this.onSubmit}
              onReSelectQuiz={this.onReSelectQuiz}
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
              {loading ? (
                <LinearProgress className={classes.loadingBar} />
              ) : null}

              <Step />

              <ResultModal
                open={showResultModal}
                questions={questions}
                toggle={this.toggleShowResultModal}
              />
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
