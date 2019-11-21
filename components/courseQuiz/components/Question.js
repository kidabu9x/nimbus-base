import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import QuestionDetail from "./Question/Question";

const styles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    textAlign: "left"
  }
}));

const Question = props => {
  const {
    questions,
    questionIndex
    // menuAvailable,
    // showMenu,
    // onSetQuestionIndex,
    // onToggleShowMenu
  } = props;
  const classes = styles();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    if (questions[questionIndex]) {
      setQuestion(questions[questionIndex]);
    }
  }, [questions, questionIndex]);

  if (!question) return null;

  return (
    <div className={classes.root}>
      <QuestionDetail
        question={question.question}
        index={questionIndex}
        total={questions.length}
      />
    </div>
  );
};

Question.propTypes = {
  questions: PropTypes.array,
  questionIndex: PropTypes.number,
  menuAvailable: PropTypes.bool,
  showMenu: PropTypes.bool,
  onSetQuestionIndex: PropTypes.func,
  onToggleShowMenu: PropTypes.func
};

export default Question;
