import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

import ValidateCode from "./components/ValidateCode";
import SelectQuiz from "./components/SelectQuiz";
import Question from "./components/Question";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    position: "relative"
  },
  loadingBar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%"
  },
  container: {
    maxWidth: 450,
    padding: theme.spacing(2),
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      position: "absolute",
      top: "30%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid #dadce0",
      padding: theme.spacing(6, 5, 4),
      borderRadius: theme.spacing(1)
    }
  },
  wrapper: {
    position: "relative"
  }
});

class Body extends Component {
  render() {
    const {
      classes,
      user,
      step,
      codeInvalid,
      codeLoading,
      onGetCode,
      // general actions
      onSwitchAccount,
      onBackStep,
      // quiz
      quizzes,
      quiz,
      quizzesLoading,
      onSetQuiz,

      // questions
      questions,
      questionIndex,
      menuAvailable,
      showMenu,
      onSetQuestionIndex,
      onToggleShowMenu
    } = this.props;
    const Step = () => {
      switch (step) {
        case 1:
          return (
            <ValidateCode
              user={user}
              codeLoading={codeLoading}
              codeInvalid={codeInvalid}
              onGetCode={onGetCode}
              onSwitchAccount={onSwitchAccount}
            />
          );
        case 2:
          return (
            <SelectQuiz
              quizzes={quizzes}
              quiz={quiz}
              onSetQuiz={onSetQuiz}
              onBackStep={onBackStep}
            />
          );
        case 3:
          return (
            <Question
              questions={questions}
              questionIndex={questionIndex}
              menuAvailable={menuAvailable}
              showMenu={showMenu}
              onSetQuestionIndex={onSetQuestionIndex}
              onToggleShowMenu={onToggleShowMenu}
            />
          );
        default:
          break;
      }
    };

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.wrapper}>
            {/* <LinearProgress className={classes.loadingBar} /> */}
            {codeLoading || quizzesLoading ? (
              <LinearProgress className={classes.loadingBar} />
            ) : null}
            <Step />
          </div>
        </div>
      </div>
    );
  }
}

Body.propTypes = {
  // general object
  classes: PropTypes.object,
  user: PropTypes.object,
  step: PropTypes.number,
  // code
  codeInvalid: PropTypes.bool,
  codeLoading: PropTypes.bool,
  onGetCode: PropTypes.func,
  // quiz
  questions: PropTypes.array,
  questionIndex: PropTypes.number,
  menuAvailable: PropTypes.bool,
  showMenu: PropTypes.bool,
  onToggleShowMenu: PropTypes.func,
  onSetQuestionIndex: PropTypes.func,
  // questions
  quizzes: PropTypes.array,
  quiz: PropTypes.object,
  setQuiz: PropTypes.func,
  quizzesLoading: PropTypes.bool,
  // general actions
  onSwitchAccount: PropTypes.func,
  onBackStep: PropTypes.func,
  onSetQuiz: PropTypes.func
};

export default withStyles(styles)(Body);
